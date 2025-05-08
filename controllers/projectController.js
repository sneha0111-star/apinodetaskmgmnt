const Project = require('../models/Project');
const bcrypt = require('bcrypt');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json({
            isSuccess: true,
            message: 'Created Successfully',
           
        });
    } catch (err) {
        res.status(400).json({
            isSuccess: false,
            message: 'Failed to create project',
            error: err.message
        });
    }
};


// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('created_by');
        
        res.status(200).json({
            isSuccess: true,
            message: 'Data Found',
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: 'Failed to fetch projects',
            error: err.message
        });
    }
};


exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('created_by');
        if (!project) {
            return res.status(404).json({
                isSuccess: false,
                message: 'Project not found',
                data: null
            });
        }
        res.status(200).json({
            isSuccess: true,
            message: 'Data Found',
            data: project
        });
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: 'Server Error',
            error: err.message
        });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({
                isSuccess: false,
                message: 'Data not found',
               
            });
        }
        res.status(200).json({
            isSuccess: true,
            message: 'Data Updated Successfully',
          
        });
    } catch (err) {
        res.status(400).json({
            isSuccess: false,
            message: 'Failed to update project',
            error: err.message
        });
    }
};


exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({
                isSuccess: false,
                message: 'Data not found',
                data: null
            });
        }
        res.status(200).json({
            isSuccess: true,
            message: 'Data Delete Successfully',
        });
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: 'Failed to delete project',
            error: err.message
        });
    }
};

