const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth ,commentController.createComment);
router.get('/task/:task_id',auth, commentController.getCommentsByTask);
router.get('/:id', auth, commentController.getCommentById);
router.put('/:id',auth, commentController.updateComment);
router.delete('/:id',auth, commentController.deleteComment);

module.exports = router;
