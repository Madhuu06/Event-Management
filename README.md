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

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB 4.4+

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

