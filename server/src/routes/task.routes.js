const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/task.model');
const auth = require('../middleware/auth.middleware');

// Get all tasks for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new task
router.post('/',
    auth,
    [
        body('title').trim().notEmpty(),
        body('description').optional().trim(),
        body('status').optional().isIn(['pending', 'in-progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
        body('dueDate').optional().isISO8601()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const task = new Task({
                ...req.body,
                user: req.user._id
            });

            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Update a task
router.put('/:id',
    auth,
    [
        body('title').optional().trim().notEmpty(),
        body('description').optional().trim(),
        body('status').optional().isIn(['pending', 'in-progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
        body('dueDate').optional().isISO8601()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const task = await Task.findOne({
                _id: req.params.id,
                user: req.user._id
            });

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update task fields
            Object.keys(req.body).forEach(key => {
                if (req.body[key] !== undefined) {
                    task[key] = req.body[key];
                }
            });

            await task.save();
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single task
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 