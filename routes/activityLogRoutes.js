const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');
const auth = require('../middlewares/authMiddleware');


router.post('/',auth, activityLogController.createActivityLog);

router.get('/',auth, activityLogController.getAllActivityLogs);

module.exports = router;
