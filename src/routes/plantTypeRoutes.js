const express = require('express');
const router = express.Router();

const plantTypeController = require('../controllers/plantTypeController');

router.get('/', plantTypeController.getAllPlantTypes);

module.exports = router;
