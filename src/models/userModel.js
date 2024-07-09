const pool = require('../services/db');

module.exports.existsEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE email = ?;
    `;

    const VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.existsUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE username = ?;
    `;

    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertUser = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO User (username, email)
        VALUES (?, ?);

        SELECT * FROM User
        WHERE user_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllUsers = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectUserWithTotalPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT User.user_id, User.username, User.email, SUM(Task.points) AS total_points
        FROM User
        INNER JOIN TaskProgress ON User.user_id = TaskProgress.user_id
        INNER JOIN Task ON TaskProgress.task_id = Task.task_id
        WHERE User.user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.associatedEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE user_id != ? AND email = ?;  /* selects if email exists in other users already */
    `;

    const VALUES = [data.user_id, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.associatedUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE user_id != ? AND username = ?;  /* selects if username exists in other users already */
    `;

    const VALUES = [data.user_id, data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUser = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?;

        SELECT * FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.username, data.email, data.user_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteUser = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;

        DELETE FROM TaskProgress
        WHERE user_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;

        DELETE FROM StarredTask
        WHERE user_id = ?;

        ALTER TABLE StarredTask AUTO_INCREMENT = 1;

        DELETE FROM Item
        WHERE owner_id = ?;

        ALTER TABLE Item AUTO_INCREMENT = 1;

        DELETE FROM Plant
        WHERE owner_id = ?;

        ALTER TABLE Plant AUTO_INCREMENT = 1;

        DELETE FROM PointsSpent
        WHERE user_id = ?;

        ALTER TABLE PointsSpent AUTO_INCREMENT = 1;

        DELETE FROM Streak
        WHERE user_id = ?;

        ALTER TABLE Streak AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
