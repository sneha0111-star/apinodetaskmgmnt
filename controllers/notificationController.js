const Notification = require('../models/notification');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { user_id, message, related_task_id, related_project_id } = req.body;

    const newNotification = new Notification({
      user_id,
      message,
      related_task_id,
      related_project_id,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      isSuccess: true,
      message: 'Notification created successfully',
      data: savedNotification,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to create notification',
      error: err.message,
    });
  }
};


exports.getAllNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find().populate('user_id').populate('related_task_id').populate('related_project_id');
      
      if (notifications.length === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: 'No notifications found',
        });
      }
  
      res.status(200).json({
        isSuccess: true,
        message: 'Notifications fetched successfully',
        data: notifications,
      });
    } catch (err) {
      res.status(500).json({
        isSuccess: false,
        message: 'Failed to fetch notifications',
        error: err.message,
      });
    }
  };