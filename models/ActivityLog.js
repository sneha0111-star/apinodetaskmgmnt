const mongoose = require('mongoose');

// Define the schema for activity_log
const activityLogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // reference to User model
    required: true,
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',  // reference to Task model
    default: null,
  },
  action: {
    type: String,
    required: true,
    maxlength: 255,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model for activity_log
const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
