const express = require('express');
const router = express.Router();
const { getUserList,registerUser,getUserById } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware'); // assuming your auth middleware is saved here
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Set up multer storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, '..', 'uploads');
      // Check if the folder exists, create it if not
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath); // use the path to save files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // unique filename
    }
  });
  
const upload = multer({ storage: storage });




router.get('/List', auth, getUserList);
router.get('/:id', auth, getUserById);
router.post('/register', upload.single('image'), registerUser);


module.exports = router;
