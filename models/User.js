const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  image: { type: String, default: null },
  token: { type: String, default: null },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
