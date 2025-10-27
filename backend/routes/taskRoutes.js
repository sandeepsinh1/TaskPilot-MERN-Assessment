const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware'); // correct import

router.post('/', protect, roleCheck(['admin']), createTask);
router.get('/', protect, getTasks);
router.patch('/:id', protect, updateTaskStatus);

module.exports = router;
