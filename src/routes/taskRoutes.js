const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:task_id', taskController.getTaskById);
router.put('/:task_id', taskController.updateTaskById);
router.delete('/:task_id', taskController.deleteTaskById);

module.exports = router;
