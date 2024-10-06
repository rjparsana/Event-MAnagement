const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware to verify the token
const router = express.Router();

// Create an event (protected route)
router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  try {
    if (!title || !description || !date || !location || !maxAttendees) {
      return res.status(400).json({ message: 'Please fill out all fields' });
    }

    // Create new event
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      creator: req.userId  // The user ID from the decoded token
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
