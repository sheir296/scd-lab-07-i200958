const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
