from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# MongoDB configuration
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DATABASE_NAME = os.environ.get('DATABASE_NAME', 'event_management')

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
events_collection = db.events

def event_to_dict(event):
    """Convert MongoDB document to dictionary"""
    if event:
        event['_id'] = str(event['_id'])  # Convert ObjectId to string
        # Extract date and time from event_datetime
        event_datetime = event['event_datetime']
        event['date'] = event_datetime.date()
        event['time'] = event_datetime.time()
        # Check if event is past
        event['is_past'] = event_datetime < datetime.now()
        return event
    return None

# Routes
@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        # Get all events and sort by event_datetime
        events = list(events_collection.find().sort([('event_datetime', 1)]))
        result = []
        
        for event in events:
            event_dict = event_to_dict(event)
            if event_dict:
                # Convert date and time to ISO format for frontend
                event_dict['date'] = event_dict['date'].isoformat()
                event_dict['time'] = event_dict['time'].strftime('%H:%M')
                event_dict['created_at'] = event_dict['created_at'].isoformat()
                # Remove the internal datetime field from response
                event_dict.pop('event_datetime', None)
                result.append(event_dict)
        
        return jsonify(result)
    except Exception as e:
        print(f"Error getting events: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/events', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        print(f"Received data: {data}")  # Debug logging
        
        # Validate required fields
        if not all(key in data for key in ['name', 'venue', 'date', 'time']):
            print("Missing required fields")
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create event document - store as datetime for MongoDB compatibility
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
        time_obj = datetime.strptime(data['time'], '%H:%M').time()
        event_datetime = datetime.combine(date_obj, time_obj)
        
        event = {
            'name': data['name'],
            'venue': data['venue'],
            'event_datetime': event_datetime,  # Store as single datetime
            'created_at': datetime.now()
        }
        print(f"Created event object: {event}")  # Debug logging
        
        # Insert into MongoDB
        result = events_collection.insert_one(event)
        print(f"Insert result: {result.inserted_id}")  # Debug logging
        
        # Get the created event
        created_event = events_collection.find_one({'_id': result.inserted_id})
        event_dict = event_to_dict(created_event)
        
        # Format for response
        event_dict['date'] = event_dict['date'].isoformat()
        event_dict['time'] = event_dict['time'].strftime('%H:%M')
        event_dict['created_at'] = event_dict['created_at'].isoformat()
        # Remove the internal datetime field from response
        event_dict.pop('event_datetime', None)
        
        return jsonify(event_dict), 201
        
    except ValueError as e:
        print(f"ValueError: {e}")  # Debug logging
        return jsonify({'error': f'Invalid date or time format: {str(e)}'}), 400
    except Exception as e:
        print(f"Exception: {e}")  # Debug logging
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        # Validate ObjectId
        if not ObjectId.is_valid(event_id):
            return jsonify({'error': 'Invalid event ID'}), 400
        
        # Delete the event
        result = events_collection.delete_one({'_id': ObjectId(event_id)})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Event not found'}), 404
        
        return jsonify({'message': 'Event deleted successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        # Validate ObjectId
        if not ObjectId.is_valid(event_id):
            return jsonify({'error': 'Invalid event ID'}), 400
        
        data = request.get_json()
        update_data = {}
        
        # Update fields if provided
        if 'name' in data:
            update_data['name'] = data['name']
        if 'venue' in data:
            update_data['venue'] = data['venue']
        if 'date' in data:
            update_data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'time' in data:
            update_data['time'] = datetime.strptime(data['time'], '%H:%M').time()
        
        if not update_data:
            return jsonify({'error': 'No fields to update'}), 400
        
        # Update the event
        result = events_collection.update_one(
            {'_id': ObjectId(event_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Event not found'}), 404
        
        # Get updated event
        updated_event = events_collection.find_one({'_id': ObjectId(event_id)})
        event_dict = event_to_dict(updated_event)
        
        # Format for response
        event_dict['date'] = event_dict['date'].isoformat()
        event_dict['time'] = event_dict['time'].strftime('%H:%M')
        event_dict['created_at'] = event_dict['created_at'].isoformat()
        
        return jsonify(event_dict)
        
    except ValueError as e:
        return jsonify({'error': 'Invalid date or time format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        # Test MongoDB connection
        client.admin.command('ping')
        return jsonify({'status': 'healthy', 'database': 'connected'})
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Event Management API...")
    print(f"MongoDB URI: {MONGO_URI}")
    print(f"Database: {DATABASE_NAME}")
    app.run(debug=True, port=5000)
