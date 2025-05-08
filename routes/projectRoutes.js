const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const projectController = require('../controllers/projectController');

router.post('/Create', auth, projectController.createProject);
router.get('/', auth, projectController.getAllProjects);
router.get('/:id', auth, projectController.getProjectById);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
