const model = require('../models/taskModel');

/// POST /tasks ///
module.exports.createTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            "message": "title, description and/or points is/are undefined"
        });
        return;  // end function
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in createTask: ', error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1][0]);  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
        }
    }

    model.insertTask(data, callback);
}

/// GET /tasks ///
module.exports.getAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllTasks: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllTasks(callback);
}

/// GET /tasks/{task_id} ///
module.exports.getTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error getTaskById: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // task does not exist
            res.status(404).json({
                "message": `task_id ${data.task_id} does not exist`
            });
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.selectTask(data, callback);
}

/// PUT /tasks/{task_id} ///
module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            "message": "title, description and/or points is/are undefined"
        });
        return;  // end function
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateTaskById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // task was not updated
            res.status(404).json({
                "message": `task_id ${data.task_id} does not exist`
            });
        } else {
            res.status(200).json(results[1][0]);
        }
    }
    model.updateTask(data, callback);
}

/// DELETE /tasks/{task_id} ///
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteTaskById: ', error);
            res.status(204).json(error);
        } else if (results[0].affectedRows == 0) {  // task was not deleted
            res.status(404).json({
                "message": `task_id ${data.task_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteTask(data, callback);
}
