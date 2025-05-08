const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');

router.get('/',auth, notificationController.getAllNotifications);
router.post('/',auth, notificationController.createNotification);

module.exports = router;