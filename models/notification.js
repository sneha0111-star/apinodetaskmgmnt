const mongoose = require('mongoose');

// Define the schema for notifications
const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // reference to User model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  related_task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',  // reference to Task model
    default: null,
  },
  related_project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',  // reference to Project model
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
