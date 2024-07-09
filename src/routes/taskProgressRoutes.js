const express = require('express');
const router = express.Router();

const streakController = require('../controllers/streakController');
const taskProgressController = require('../controllers/taskProgressController');

router.post('/', taskProgressController.checkUserIdExists, taskProgressController.checkTaskIdExists, taskProgressController.createNewTask, taskProgressController.checkUserIdExists, streakController.getUserCompletionDates, streakController.getUserFreezeStreaks, streakController.calculateUserStreak, streakController.addUserStreak);
router.get('/:progress_id', taskProgressController.getTaskProgressById);
router.put('/:progress_id', taskProgressController.updateTaskProgressById);
router.delete('/:progress_id', taskProgressController.deleteTaskProgressById);

module.exports = router;
