const model = require('../models/storeModel');
const userModel = require('../models/userModel');

/// GET /store ///
module.exports.getStore = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getStore: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectStore(callback);
}

/// GET /store/points/{user_id} ///
module.exports.getTotalPointsEarned = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getTotalPointsEarned: ', error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {  // no points earned yet
                res.locals.total_points = 0;
            } else {
                res.locals.total_points = results[0].total_points
            }
            next();
        }
    }

    userModel.selectUserWithTotalPoints(data, callback);
}

/// GET /store/points/{user_id} ///
module.exports.getPointsSpent = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getPointsSpent: ', error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {  // no points spent yet
                res.locals.net_points = res.locals.total_points;
            } else {  // deduct total points earned with total points spent
                res.locals.net_points = res.locals.total_points - results[0].points_spent;
            }
            next();
        }
    }

    model.selectPointsSpent(data, callback);
}

/// GET /store/points/{user_id} ///
module.exports.getNetPoints = (req, res, next) => {
    res.status(200).json({
        "net_points": Number(res.locals.net_points)
    });
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.checkStoreItemId = (req, res, next) => {
    if (req.params.store_item_id == undefined) {
        res.status(400).json({
            "message": "store_item_id is undefined"
        });
        return;
    }

    res.locals.store_item_id = Number(req.params.store_item_id);

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in purchaseStoreItem: ', error);
            res.status(500).json(error);
        } else {
            var store_item_ids = [];

            for (var i=0; i<results.length; i++) {
                store_item_ids.push(results[i].storeitem_id);  // get all store_item_ids from store
            }

            if (store_item_ids.includes(res.locals.store_item_id)) {  // if requested store_item_id is in store
                next();
            } else {
                res.status(400).json({
                    "message": `store_item_id ${req.params.store_item_id} is invalid`
                });
            }
        }
    }

    model.selectStore(callback);
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.checkSufficentPoints = (req, res, next) => {
    const data = {
        store_item_id: res.locals.store_item_id
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in checkSufficentPoints: ', error);
            res.status(500).json(error);
        } else {
            res.locals.cost = results[0].cost.slice(0, 3);  // get numerical value of cost as cost is xx points
            if (res.locals.net_points < res.locals.cost) {
                res.status(403).json({
                    "message": `Insufficient points to purchase store_item_id ${res.locals.store_item_id}`
                });
            } else {
                next();
            }
        }
    }

    model.selectStoreItemCost(data, callback);
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.buyItem = (req, res, next) => {
    if (res.locals.store_item_id == 1) {  // if user requested to buy item
        const data = {
            store_item_id: res.locals.store_item_id,
            user_id: res.locals.user_id
        }
        
        const callback = (error, results, fields) => {
            if (error) {
                console.log('Error in buyItem: ', error);
                res.status(500).json(error);
            } else {
                res.locals.results = results[1][0];
                next();
            }
        }

        model.insertItem(data, callback);
    } else {
        next();
    }
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.getRandomPlant = (req, res, next) => {
    if (res.locals.store_item_id == 2) {  // if user requested to buy plant
        const num = Math.random(); // 0,04
        if (num < 0.05) {  // legendary chance
            res.locals.rarity = 'Legendary';
        } else if (num < 0.25) {  // rare + legendary chance
            res.locals.rarity = 'Rare';
        } else {  // common chance
            res.locals.rarity = 'Common';
        }

        const data = {
            rarity: res.locals.rarity
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.log('Error in getRandomPlant: ', error);
                res.status(500).json(error);
            } else {
                res.locals.plant_type_id = results[0].type_id;
                next();
            }
        }

        model.selectRandomPlant(data, callback);
    } else {
        next();
    }
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.checkPlantExists = (req, res, next) => {
    if (res.locals.store_item_id == 2) {  // if user requested to buy plant
        const data = {
            plant_type_id: res.locals.plant_type_id,
            user_id: res.locals.user_id
        }
    
        const callback = (error, results, fields) => {
            if (error) {
                console.log('Error in checkPlantExists: ', error);
                res.status(500).json(error);
            } else {
                if (results.length == 0) {
                    res.locals.plant_exists = false;
                } else {
                    res.locals.plant_exists = true;
                }
                next();
            }
        }
    
        model.checkPlantExists(data, callback);
    } else {
        next();
    }
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.addNewPlant = (req, res, next) => {
    if (res.locals.store_item_id == 2) {  // if user requested to buy plant
        if (!res.locals.plant_exists) {  // plant does not exist
            const data = {
                plant_type_id: res.locals.plant_type_id,
                user_id: res.locals.user_id
            }
            
            const callback = (error, results, fields) => {
                if (error) {
                    console.log('Error in addNewPlant: ', error);
                    res.status(500).json(error);
                } else {
                    res.locals.last_id = results.insertId;
                    next();
                }
            }
    
            model.insertPlant(data, callback);
        } else {
            next();
        }
    } else {
        next();
    }
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.updatePlant = (req, res, next) => {
    if (res.locals.store_item_id == 2) {  // if user requested to buy plant
        if (res.locals.plant_exists) {  // plant exists
            const data = {
                plant_type_id: res.locals.plant_type_id,
                user_id: res.locals.user_id
            }
            
            const callback = (error, results, fields) => {
                if (error) {
                    console.log('Error in updatePlant: ', error);
                    res.status(500).json(error);
                } else {
                    res.locals.last_id = results[1][0].insertId;
                    next();
                }
            }
    
            model.updatePlant(data, callback);
        } else {
            next();
        }
    } else {
        next();
    }
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.getPlantDetails = (req, res, next) => {
    if (res.locals.store_item_id == 2) {  // if user requested to buy plant
        const data = {
            last_id: res.locals.last_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.log('Error in getPlantDetails: ', error);
                res.status(500).json(error);
            } else {
                res.locals.results = results[0];
                next();
            }
        }

        model.selectPlantDetails(data, callback);
    } else {
        next();
    }
}

/// POST store/{user_id}/{store_item_id} ///
module.exports.updatePointsSpent = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        points_spent: res.locals.cost
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in updatePointsSpent: ', error);
            res.status(500).json(error);
        } else {
            res.status(201).json(res.locals.results);
        }
    }

    model.updatePointsSpent(data, callback);
}