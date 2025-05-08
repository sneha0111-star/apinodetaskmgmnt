const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // make sure Task model exists
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Attachment', attachmentSchema);
