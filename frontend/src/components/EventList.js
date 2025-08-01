import React from 'react';

const EventList = ({ events, onEventDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onEventDelete(eventId);
    }
  };

  if (events.length === 0) {
    return (
      <div className="events-list">
        <div className="events-header">
          <h2>Events</h2>
        </div>
        <div className="no-events">
          No events scheduled yet. Add your first event above!
        </div>
      </div>
    );
  }

  return (
    <div className="events-list">
      <div className="events-header">
        <h2>Events ({events.length})</h2>
      </div>
      
      {events.map((event) => (
        <div 
          key={event._id} 
          className={`event-item ${event.is_past ? 'past-event' : ''}`}
        >
          <div className="event-name">
            {event.name}
          </div>
          
          <div className="event-details">
            <div className="event-info">
              <span>📍 {event.venue}</span>
              <span>📅 {formatDate(event.date)}</span>
              <span>🕐 {formatTime(event.time)}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={`event-status ${event.is_past ? 'status-past' : 'status-upcoming'}`}>
                {event.is_past ? 'Event Over' : 'Upcoming'}
              </span>
              
              <button 
                className="delete-btn"
                onClick={() => handleDelete(event._id)}
                title="Delete Event"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
