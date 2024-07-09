const model = require('../models/inventoryModel.js');

/// GET /inventory/{user_id} ///
module.exports.getAllOwnedPlants = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllOwnedPlants: ', error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {  // no plants owned yet
                res.locals.owned_plants = `user_id ${res.locals.user_id} does not own any plants`;
            } else {
                res.locals.owned_plants = results;
            }
            next();
        }
    }

    model.selectAllOwnedPlants(data, callback);
}

/// GET /inventory/{user_id} ///
module.exports.getAllOwnedItems = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllOwnedItems: ', error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {  // no items owned yet
                res.locals.owned_items = `user_id ${res.locals.user_id} does not own any items`;
            } else {
                res.locals.owned_items = results;
            }
            next();
        }
    }

    model.selectAllOwnedItems(data, callback);
}

/// GET /inventory/{user_id} ///
module.exports.showInventory = (req, res, next) => {
    res.status(200).json({
        "owned_plants": res.locals.owned_plants,
        "owned_items": res.locals.owned_items
    });
}

/// DELETE /inventory/items/{user_id}/{item_id} ///
module.exports.deleteItem = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in deleteItem: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                "message": `item_id ${req.params.item_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteItem(data, callback);
}

/// DELETE /inventory/plants/{user_id}/{item_id} ///
module.exports.deletePlant = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        plant_id: req.params.plant_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in deletePlant: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                "message": `plant_id ${req.params.plant_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deletePlant(data, callback);
}