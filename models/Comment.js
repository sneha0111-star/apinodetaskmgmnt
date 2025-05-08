const mongoose = require('mongoose');

// Define the schema for comments
const commentSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // reference to Task model
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User model
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model for comments
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
