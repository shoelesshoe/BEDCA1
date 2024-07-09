const pool = require('../services/db');

module.exports.selectPlantTypes = (callback) => {
    const SQLSTATEMENT = `
        SELECT name, rarity FROM PlantType;
    `;

    pool.query(SQLSTATEMENT, callback);
}