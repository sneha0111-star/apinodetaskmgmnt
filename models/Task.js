const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',  // references the 'projects' collection
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    due_date: {
        type: Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // references the 'users' collection
        required: true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update updated_at on save
taskSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
