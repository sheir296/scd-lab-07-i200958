const Task = require('../models/Task');

exports.createTask = (req, res) => {
    const { title, description, dueDate, category, priority } = req.body;
    const user = req.user;

    const newTask = new Task({
        title,
        description,
        dueDate,
        category,
        priority,
        completed: false, 
        user: user._id
    });

    newTask.save()
        .then(task => {
            res.status(201).json({ success: true, task });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Failed to create task', error: err });
        });
};

exports.getTasks = (req, res) => {
    const user = req.user;

    Task.find({ user: user._id })
        .sort({ dueDate: 1 }) // Sort tasks by due date ascending
        .then(tasks => {
            res.status(200).json({ success: true, tasks });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Failed to fetch tasks', error: err });
        });
};

// update  task
exports.updateTask = (req, res) => {
    const taskId = req.params.taskId;
    const { title, description, dueDate, category, priority, completed } = req.body;

    Task.findByIdAndUpdate(taskId, { title, description, dueDate, category, priority, completed }, { new: true })
        .then(updatedTask => {
            res.status(200).json({ success: true, task: updatedTask });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Failed to update task', error: err });
        });
};

// delete  task
exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;

    Task.findByIdAndDelete(taskId)
        .then(deletedTask => {
            res.status(200).json({ success: true, message: 'Task deleted successfully' });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Failed to delete task', error: err });
        });
};
