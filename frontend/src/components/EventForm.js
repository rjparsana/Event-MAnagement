import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const navigate = useNavigate();  // For redirecting after event creation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  // Get the JWT token

    try {
      const res = await axios.post(
        'http://localhost:5000/api/events/create',  // Backend API endpoint
        { title, description, date, location, maxAttendees },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the Authorization header
          }
        }
      );
      alert('Event created successfully!');
      navigate('/events');  // Redirect to the events page after creating the event
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Event Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Max Attendees"
        value={maxAttendees}
        onChange={(e) => setMaxAttendees(e.target.value)}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
