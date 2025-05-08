const Attachment = require('../models/Attachment');

exports.createAttachment = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ isSuccess: false, message: 'No file uploaded' });
    }

    const attachment = new Attachment({
      task_id: req.body.task_id,
      file_name: file.originalname,
      file_path: file.path,
    });

    await attachment.save();

    res.status(201).json({ isSuccess: true, message: 'Attachment uploaded', data: attachment });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: 'Error uploading attachment', error: err.message });
  }
};

exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find().populate('task_id');
    res.status(200).json({ isSuccess: true, data: attachments });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: 'Error fetching attachments', error: err.message });
  }
};
