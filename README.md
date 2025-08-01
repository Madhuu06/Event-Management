# Event Management System

A full-stack web application for managing events with React frontend, Flask backend, and PostgreSQL database.

## Features

- Add new events with name, venue, date, and time
- View all events in a clean, organized list
- Automatic detection of past events (shown in gray with "Event Over" status)
- Upcoming events highlighted with green status
- Delete events functionality
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React.js with Axios for API calls
- **Backend**: Python Flask with PyMongo
- **Database**: MongoDB
- **Styling**: Pure CSS with responsive design

## Project Structure

```
Event Management/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventForm.js    # Event creation form
│   │   │   └── EventList.js    # Events display component
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Styling
│   └── package.json       # Node.js dependencies
└── README.md              # This file
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB 4.4+

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file from `.env.example` and update the database URL:
```bash
copy .env.example .env  # On Windows
# cp .env.example .env  # On macOS/Linux
```

5. Update the `.env` file with your MongoDB settings (optional):
```
MONGO_URI=mongodb://localhost:27017/
DATABASE_NAME=event_management
```

6. Run the Flask application:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `PUT /api/events/<id>` - Update an event
- `DELETE /api/events/<id>` - Delete an event

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Fill in the event form with:
   - Event Name
   - Venue
   - Date
   - Time
3. Click "Add Event" to create the event
4. View all events in the list below
5. Past events will automatically appear in gray with "Event Over" status
6. Delete events using the "Delete" button

## Features in Detail

### Event Status Detection
- Events are automatically marked as "past" based on the current date and time
- Past events are displayed with reduced opacity and gray styling
- Upcoming events are highlighted with green status indicators

### Responsive Design
- Mobile-friendly interface
- Flexible layout that adapts to different screen sizes
- Touch-friendly buttons and inputs

