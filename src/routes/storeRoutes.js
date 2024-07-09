const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');
const starredTaskController = require('../controllers/starredTaskController');

router.get('/', storeController.getStore);
router.get('/points/:user_id', starredTaskController.checkUserExists, storeController.getTotalPointsEarned, storeController.getPointsSpent, storeController.getNetPoints);
router.post('/:user_id/:store_item_id', starredTaskController.checkUserExists, storeController.checkStoreItemId, storeController.getTotalPointsEarned, storeController.getPointsSpent, storeController.checkSufficentPoints, storeController.buyItem, storeController.getRandomPlant, storeController.checkPlantExists, storeController.addNewPlant, storeController.updatePlant, storeController.getPlantDetails, storeController.updatePointsSpent);

module.exports = router;
