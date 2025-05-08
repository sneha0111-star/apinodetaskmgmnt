const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth,taskController.createTask);
router.get('/', auth,taskController.getAllTasks);
router.get('/:id',auth, taskController.getTaskById);
router.put('/:id',auth, taskController.updateTask);
router.delete('/:id',auth, taskController.deleteTask);

module.exports = router;