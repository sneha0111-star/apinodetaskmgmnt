const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { task_id, user_id, comment } = req.body;

    // Create a new comment instance
    const newComment = new Comment({
      task_id,
      user_id,
      comment,
    });

    const savedComment = await newComment.save();

    res.status(201).json({
      isSuccess: true,
      message: 'Data Created Successfully',
     
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to create comment',
      error: err.message,
    });
  }
};

// Get all comments for a specific task
exports.getCommentsByTask = async (req, res) => {
  try {
    const { task_id } = req.params;

    const comments = await Comment.find({ task_id }).populate('user_id', 'name email'); // Populate user details

    if (comments.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: 'No comments found for this task',
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: 'Data Found',
      data: comments,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to fetch comments',
      error: err.message,
    });
  }
};

// Get a specific comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user_id', 'name email');

    if (!comment) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Comment not found',
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: 'Data Found',
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to fetch comment',
      error: err.message,
    });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!comment) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Data not found',
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: 'Comment Updated Successfully',
    
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to update comment',
      error: err.message,
    });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Comment not found',
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: 'Comment Deleted Successfully',
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: 'Failed to delete comment',
      error: err.message,
    });
  }
};
