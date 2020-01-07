const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  username: { type: String, required: true }, //time will be either morning or afternoon?
  mood: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Mood = mongoose.model('Mood', MoodSchema);

module.exports = Mood;