const express = require('express');
const router = express.Router();

const leaderboardController = require('../controllers/leaderboardController');

router.get('/streak', leaderboardController.getStreakLeaderboard);
router.get('/complete_tasks', leaderboardController.getCompleteTasksLeaderboard);
router.get('/points', leaderboardController.getPointsLeaderboard);
router.get('/plant_level', leaderboardController.getPlantLevelLeaderboard);

module.exports = router;
