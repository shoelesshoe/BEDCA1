const pool = require('../services/db');

module.exports.insertTask = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?);

        SELECT * FROM Task
        WHERE task_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.title, data.description, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllTasks = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Task;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectTask = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Task
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateTask = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;

        SELECT * FROM Task
        WHERE task_id = ?;
    `;

    VALUES = [data.title, data.description, data.points, data.task_id, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteTask = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Task
        WHERE task_id = ?;

        DELETE FROM TaskProgress
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
