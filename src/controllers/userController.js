const model = require('../models/userModel');

/// POST /users ///
module.exports.checkEmailExists = (req, res, next) => {
    if (req.body.email == undefined) {
        res.status(400).json({
            "message": "email is undefined"
        });
        return;  // end function
    }

    const data = {
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkEmailExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // email does not exist
            res.locals.email = req.body.email;
            next();
        } else {
            res.status(409).json({
                "message": "email is already associated with another user"
            });
        }
    }

    model.existsEmail(data, callback);
}

module.exports.checkUsernameExists = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({
            "message": "username is undefined"
        });
        return;  // end function
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUserExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // username does not exist
            res.locals.username = req.body.username;
            next();
        } else {
            res.status(409).json({
                "message": 'username is already associated with another user'
            });
        }
    }

    model.existsUsername(data, callback);
}

module.exports.createUser = (req, res, next) => {
    const data = {
        username: res.locals.username,
        email: res.locals.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in createUser: ', error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1][0]);  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
        }
    }

    model.insertUser(data, callback);
}

/// GET /users ///
module.exports.getAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllUsers: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllUsers(callback);
}

/// GET /users/{user_id} ///
module.exports.checkUserExists = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUserExists', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // user does not exist
            res.status(404).json({
                "message": `user_id ${data.user_id} does not exist`
            });
        } else {
            res.locals.user_id = req.params.user_id;
            next();
        }
    }

    model.selectUserById(data, callback);
}

module.exports.getUserByIdWithTotalPoints = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getUserById: ', error);
            res.status(500).json(error);
        } else if (results[0].total_points == null) {  // user exists but has no completed tasks
            res.locals.user_id = req.params.user_id;
            next();
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.selectUserWithTotalPoints(data, callback);
}

module.exports.getUserByIdWithoutTotalPoints = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getUserByIdWithoutTotalPoints: ', error);
            res.status(500).json(error);
        } else {
            results[0]['total_points'] = 0;  // set value null to 0
            res.status(200).json(results[0]);
        }
    }
    
    model.selectUserById(data, callback);
}

/// PUT /users/{user_id} ///
module.exports.checkEmailAssociation = (req, res, next) => {
    if (req.body.email == undefined) {
        res.status(400).json({
            "message": `email is undefined`
        });
        return;  // end function
    }

    const data = {
        user_id: req.params.user_id,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkEmailAssociation: ', error);
            res.status(500).json(error);
        } else if (results[0].length == 0) {  // email is not associated with any users
            res.locals.email = req.body.email;
            next();
        } else {
            res.status(409).json({
                "message": 'email is already associated with another user'
            });
        }
    }

    model.associatedEmail(data, callback);
}

module.exports.checkUsernameAssociation = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({
            "message": "username is undefined"
        });
        return;  // end function
    }

    const data = {
        username: req.body.username,
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUsernameAssociastion: ', error);
            res.status(500).json(error);
        } else if (results[0].length == 0) {  // username is not associated with any users
            res.locals.username = req.body.username;
            next();
        } else {
            res.status(409).json({
                "message": 'username is already associated with another user'
            });
        }
    }

    model.associatedUsername(data, callback);
}

module.exports.updateUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        username: res.locals.username,
        email: res.locals.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateUserById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // user was not updated
            res.status(404).json({
                "message": `user_id ${data.user_id} does not exist`
            });
        } else {
            res.status(200).json(results[1][0]);
        }
    }

    model.updateUser(data, callback);
}

/// DELETE /users/{user_id} ///
module.exports.deleteUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteUserById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // user was not deleted
            res.status(404).json({
                "message": `user_id ${data.user_id} does not exist`
            });
        } else {
            res.status(204).json(results);
        }
    }

    model.deleteUser(data, callback);
}
