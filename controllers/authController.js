const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ isSuccess: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ isSuccess: false, message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
          isSuccess: true,
          message: 'Data Found',
          data: {
              id: user._id,
              name: user.name,
              role: user.role,
              token: token,
          }
      });
  } catch (err) {
      console.error('Error in loginUser:', err);
      res.status(500).json({ isSuccess: false, message: 'Server error' });
  }
};

