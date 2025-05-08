const ActivityLog = require('../models/ActivityLog');

// Create a new activity log entry
exports.createActivityLog = async (req, res) => {
  try {
    const { user_id, task_id, action } = req.body;

    // Create a new activity log instance
    const newLog = new ActivityLog({
      user_id,
      task_id,
      action,
    });

    // Save the activity log entry
    const savedLog = await newLog.save();

    res.status(201).json({
      isSuccess: true,
      message: 'Data Created Successfully',
     
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to create Data',
      error: err.message,
    });
  }
};

// Get all activity logs (if needed)
exports.getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate('user_id task_id');
    if (logs.length === 0) {
      return res.status(404).json({ isSuccess: false, message: 'No logs found' });
    }
    res.json({
      isSuccess: true,
      message: 'Data Found',
      data: logs,
    });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};
