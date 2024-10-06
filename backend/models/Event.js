const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  maxAttendees: { type: Number, required: true },
  currentAttendees: { type: Number, default: 0 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { type: String }, // optional field for event image
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
