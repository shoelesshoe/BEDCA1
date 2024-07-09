const express = require('express');
const router = express.Router();

const starredTaskController = require('../controllers/starredTaskController');

router.post('/:user_id/:task_id', starredTaskController.checkTaskExists, starredTaskController.checkUserExists, starredTaskController.checkStarredTaskExists, starredTaskController.addNewStarredTask);
router.get('/:user_id', starredTaskController.checkUserExists, starredTaskController.getAllStarredTasks);
router.get('/:user_id/:task_id', starredTaskController.checkUserExists, starredTaskController.checkTaskExists, starredTaskController.getStarredTask);
router.delete('/:user_id/:task_id', starredTaskController.checkUserExists, starredTaskController.checkTaskExists, starredTaskController.deleteStarredTask);

module.exports = router;
