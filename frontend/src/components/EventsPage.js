import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventForm from './EventForm';
import EventList from './EventList';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventCreate = async (eventData) => {
    try {
      await axios.post('/api/events', eventData);
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    }
  };

  const handleEventDelete = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="events-page">
      {/* Navigation Header */}
      <nav className="events-nav">
        <div className="nav-container">
          <button onClick={handleBackToHome} className="back-button">
            ← Back to Home
          </button>
          <h1 className="nav-title">Event Management</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <EventForm onEventCreate={handleEventCreate} />
        <EventList 
          events={events} 
          onEventDelete={handleEventDelete} 
        />
      </div>
    </div>
  );
};

export default EventsPage;
