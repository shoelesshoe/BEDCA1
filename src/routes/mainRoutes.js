const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const taskProgressRoutes = require('./taskProgressRoutes');
const starredTaskRoutes = require('./starredTaskRoutes');
const recommendedTaskRoutes = require('./recommendedTaskRoutes');
const streakRoutes = require('./streakRoutes');
const plantTypeRoutes = require('./plantTypeRoutes');
const storeRoutes = require('./storeRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');
const inventoryRoutes = require('./inventoryRoutes');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/task_progress', taskProgressRoutes);
router.use('/starred_tasks', starredTaskRoutes);
router.use('/recommended_tasks', recommendedTaskRoutes);
router.use('/streak', streakRoutes);
router.use('/plant_types', plantTypeRoutes);
router.use('/store', storeRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/inventory', inventoryRoutes);

module.exports = router;
