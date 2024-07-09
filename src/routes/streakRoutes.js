const express = require('express');
const router = express.Router();

const streakController = require('../controllers/streakController');
const starredTaskController = require('../controllers/starredTaskController');

router.get('/:user_id', starredTaskController.checkUserExists, streakController.getUserCompletionDates, streakController.getUserFreezeStreaks, streakController.calculateUserStreak, streakController.addUserStreak);

module.exports = router;
