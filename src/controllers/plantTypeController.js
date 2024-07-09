const model = require('../models/plantTypeModel');

/// GET /plant_types ///
module.exports.getAllPlantTypes = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllPlantTypes: ', error)
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectPlantTypes(callback);
}