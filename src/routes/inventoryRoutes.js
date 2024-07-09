const express = require('express');
const router = express.Router();

const starredTaskController = require('../controllers/starredTaskController');
const inventoryController = require('../controllers/inventoryController');

router.get('/:user_id', starredTaskController.checkUserExists, inventoryController.getAllOwnedItems, inventoryController.getAllOwnedPlants, inventoryController.showInventory);
router.delete('/items/:user_id/:item_id', starredTaskController.checkUserExists, inventoryController.deleteItem);
router.delete('/plants/:user_id/:plant_id', starredTaskController.checkUserExists, inventoryController.deletePlant);

module.exports = router;
