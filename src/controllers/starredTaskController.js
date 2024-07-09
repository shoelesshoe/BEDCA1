const model = require('../models/starredTaskModel');

module.exports.checkTaskExists = (req, res, next) => {
    if (req.params.task_id == undefined) {
        res.status(400).json({
            "message": "task_id is undefined"
        });
        return;
    }

    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkTaskExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                "message": `task_id ${req.params.task_id} does not exist`
            });
        } else {
            res.locals.task_id = req.params.task_id;
            next();
        }
    }

    model.existsTask(data, callback);
}

module.exports.checkUserExists = (req, res, next) => {
    if (req.params.user_id == undefined) {
        res.status(400).json({
            "message": "user_id is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUserExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                "message": `user_id ${req.params.user_id} does not exist`
            });
        } else {
            res.locals.user_id = req.params.user_id;
            next();
        }
    }

    model.existsUser(data, callback);
}

module.exports.checkStarredTaskExists = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkStarredTaskExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            next();
        } else {
            res.status(409).json({
                "message": `user_id ${req.params.user_id} already has starred task_id ${req.params.task_id}`
            });
        }
    }

    model.selectStarredTask(data, callback);
}

/// POST /starred_tasks/{user_id}/{task_id} ///
module.exports.addNewStarredTask = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in addNewStarredTask: ', error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1][0]);
        }
    }

    model.insertStarredTask(data, callback);
}

/// GET /starred_tasks/{user_id} ///
module.exports.getAllStarredTasks = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllStarredTasks: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                "message": `No starred tasks for user_id ${res.locals.user_id}`
            });
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllStarredTasks(data, callback);
}

/// GET /starred_tasks/{user_id}/{task_id} ///
module.exports.getStarredTask = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getStarredTask: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                "message": `No starred task_id ${res.locals.task_id} for user_id ${res.locals.user_id}`
            });
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.selectStarredTask(data, callback);
}

/// DELETE /starred_tasks/{user_id}/{task_id} ///
module.exports.deleteStarredTask = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteStarredTask: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                "message": `No starred task_id ${res.locals.task_id} for user_id ${res.locals.user_id}`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteStarredTask(data, callback);
}