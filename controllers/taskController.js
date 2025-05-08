const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json({ isSuccess: true, message: 'Created Successfully' });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// exports.getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find();

//         if (tasks.length === 0) {
//             return res.status(404).json({ 
//                 isSuccess: false, 
//                 message: 'Data Not Found' 
//             });
//         }

//         res.json({ 
//             isSuccess: true, 
//             message: 'Data Found', 
//             data: tasks 
//         });
//     } catch (err) {
//         res.status(500).json({ 
//             isSuccess: false, 
//             message: err.message 
//         });
//     }
// };


exports.getAllTasks = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.query;

        // Build a query object based on the filters
        let query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }

        if (description) {
            query.description = { $regex: description, $options: 'i' }; // Case-insensitive search
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        if (due_date) {
            const dueDate = new Date(due_date);
            query.due_date = { $lte: dueDate }; // Find tasks due on or before the specified date
        }

        const tasks = await Task.find(query);

        if (tasks.length === 0) {
            return res.status(404).json({ 
                isSuccess: false, 
                message: 'No tasks found matching the search criteria' 
            });
        }

        res.json({ 
            isSuccess: true, 
            message: 'Data Found', 
            data: tasks 
        });
    } catch (err) {
        res.status(500).json({ 
            isSuccess: false, 
            message: err.message 
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ isSuccess: false, message: 'Task not found' });
        }
        res.json({ isSuccess: true, data: task });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ isSuccess: false, message: 'Task not found' });
        }
        res.json({ isSuccess: true, message: 'Updated Successfully' });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ isSuccess: false, message: 'Task not found' });
        }
        res.json({ isSuccess: true, message: 'Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};
