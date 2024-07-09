const pool = require('../services/db');

module.exports.selectAllOwnedPlants = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT Plant.plant_id, PlantType.name, PlantType.rarity, Plant.level, Plant.planted_on FROM Plant
        INNER JOIN PlantType ON Plant.plant_type_id = PlantType.type_id
        WHERE Plant.owner_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllOwnedItems = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT Item.item_id, ItemType.name, ItemType.ability, Item.acquired_on, Item.used_on FROM Item
        INNER JOIN ItemType ON Item.item_type_id = ItemType.type_id
        WHERE Item.owner_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteItem = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Item
        WHERE owner_id = ? AND item_id = ?;

        ALTER TABLE Item AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.user_id, data.item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deletePlant = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Plant
        WHERE owner_id = ? AND plant_id = ?;

        ALTER TABLE Plant AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.user_id, data.plant_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}