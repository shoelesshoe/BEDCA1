const express = require('express');
const router = express.Router();

const recommendedTaskController = require('../controllers/recommendedTaskController');

router.get('/', recommendedTaskController.getAllRecommendedTasks);

module.exports = router;
