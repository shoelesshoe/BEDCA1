const pool = require('../services/db');

module.exports.existsUser = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?);

        SELECT * FROM TaskProgress
        WHERE progress_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;

        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

    const VALUES = [data.notes, data.progress_id, data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
