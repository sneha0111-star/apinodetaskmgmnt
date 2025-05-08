const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
      const { name, email, password, role } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ isSuccess: false, message: 'User already exists' });

      if (!password) {
          return res.status(400).json({ isSuccess: false, message: 'Password is required' });
      }
      console.log('req.file:', req.file); // debug log

      const image = req.file ? req.file.filename : null;

      user = new User({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          image,
          role
      });
      await user.save();
      console.log('Saved user:', user); // debug log
      res.json({
          isSuccess: true,
          message: 'Created Successfully',
      });
  } catch (err) {
      console.error('Error in registerUser:', err);
      res.status(500).json({ isSuccess: false, message: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
      const userId = req.params.id;

      const user = await User.findById(userId).select('-password');
      if (!user) {
          return res.status(404).json({
              isSuccess: false,
              message: 'User not found'
          });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      const userWithImageUrl = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image ? baseUrl + user.image : null
      };

      res.json({
          isSuccess: true,
          message: 'Data Found',
          data: userWithImageUrl
      });
  } catch (err) {
      console.error('Error in getUserById:', err);
      res.status(500).json({
          isSuccess: false,
          message: 'Server error'
      });
  }
};

exports.getUserList = async (req, res) => {
  try {
      const users = await User.find().select('-password');
      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      const usersWithImageUrls = users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image ? baseUrl + user.image : null
      }));

      res.json({
          isSuccess: true,
          message: 'Data Found',
          data: usersWithImageUrls
      });
  } catch (err) {
      console.error('Error in getUserList:', err);
      res.status(500).json({
          isSuccess: false,
          message: 'Server error'
      });
  }
};

// exports.updateUserById = async (req, res) => {
//   try {
//       const userId = req.body.id;  // Get user ID from POST body
//       const { name, email, role } = req.body;  // Get updated fields from body

//       // Check if the user exists
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({
//               isSuccess: false,
//               message: 'User not found'
//           });
//       }

//       // Update user details
//       if (name) user.name = name;
//       if (email) user.email = email;
//       if (role) user.role = role;

//       // Handle image upload
//       if (req.file) {
//           user.image = req.file.filename;
//       }

//       // Save updated user details
//       await user.save();

//       const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
//       const updatedUser = {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           image: user.image ? baseUrl + user.image : null
//       };

//       res.json({
//           isSuccess: true,
//           message: 'User updated successfully',
//           data: updatedUser
//       });
//   } catch (err) {
//       console.error('Error in updateUserById:', err);
//       res.status(500).json({
//           isSuccess: false,
//           message: 'Server error'
//       });
//   }
// };

