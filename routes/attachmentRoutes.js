const express = require('express');
const router = express.Router();
const multer = require('multer');
const attachmentController = require('../controllers/attachmentController');
const auth = require('../middlewares/authMiddleware');



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/',auth, upload.single('file'), attachmentController.createAttachment);
router.get('/List',auth, attachmentController.getAllAttachments);

module.exports = router;
