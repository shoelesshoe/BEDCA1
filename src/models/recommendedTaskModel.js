const pool = require('../services/db');

module.exports.selectAllRecommendedTasks = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Task
        ORDER BY RAND()
        LIMIT 3;
    `;
    
    pool.query(SQLSTATEMENT, callback);
}