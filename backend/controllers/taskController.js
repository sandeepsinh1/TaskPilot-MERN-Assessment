const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = async (req, res) => {
    const { title, description, assignedTo, status, dueDate } = req.body;
    try {
        // Validation/Error handling logic could go here, but using your provided logic:
        const task = await Task.create({ title, description, assignedTo, status, dueDate });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tasks (Admin) or user-assigned tasks (Employee)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        let tasks;
        // Check if the user is authenticated (req.user is set by 'protect' middleware)
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user data missing.' });
        }

        if (req.user.role === 'admin') {
            // Admin gets all tasks, populating the assigned user's details
            tasks = await Task.find().populate('assignedTo', 'name email');
        } else {
            // Employee gets tasks assigned only to them
            tasks = await Task.find({ assignedTo: req.user._id });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id
// @access  Private (Employee can only update their own, Admin can update any)
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        // --- Authorization Check ---
        // If the user is an employee AND the task is not assigned to them, deny access.
        if (req.user.role === 'employee' && task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task.' });
        }
        
        // Update the status (allowing other fields to remain if not provided in req.body)
        task.status = req.body.status || task.status;
        
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- FIX APPLIED HERE ---
// Explicitly export the functions so the router can successfully destructure them.
module.exports = {
    createTask,
    getTasks,
    updateTaskStatus
};