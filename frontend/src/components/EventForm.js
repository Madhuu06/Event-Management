import React, { useState } from 'react';

const EventForm = ({ onEventCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    venue: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.venue || !formData.date || !formData.time) {
      alert('Please fill in all fields');
      return;
    }

    onEventCreate(formData);
    
    // Reset form
    setFormData({
      name: '',
      venue: '',
      date: '',
      time: ''
    });
  };

  return (
    <div className="event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter venue name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
