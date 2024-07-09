const model = require('../models/taskProgressModel');
const taskModel = require('../models/taskModel');

module.exports.checkUserIdExists = (req, res, next) => {
    if (req.body.user_id == undefined) {
        res.status(400).json({
            "message": "user_id is undefined"
        });
        return;  // end function
    }

    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUserIdExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // user_id does not exist
            res.status(404).json({
                "message": `user_id ${data.user_id} does not exist`
            });
        } else {
            res.locals.user_id = data.user_id;
            next();
        }
    }

    model.existsUser(data, callback);  // created new function as userModel.selectUser returns inner joined table (redundant info)
}

module.exports.checkTaskIdExists = (req, res, next) => {
    if (req.body.task_id == undefined) {
        res.status(400).json({
            "message": "task_id is undefined"
        });
        return;  // end function
    }

    const data = {
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkTaskIdExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // task_id does not exist
            res.status(404).json({
                "message": `task_id ${data.task_id} does not exist`
            });
        } else {
            res.locals.task_id = data.task_id;
            next();
        }
    }

    taskModel.selectTask(data, callback);
}

module.exports.createNewTask = (req, res, next) => {
    if (req.body.completion_date == undefined || req.body.notes == undefined) {
        res.status(400).json({
            "message": "completion_date and/or notes is/are undefined"
        });
        return;  // end function
    }

    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in createNewTask: ', error);
            res.status(500).json(error);
        } else {
            res.locals.taskProgress = true;
            res.locals.taskProgressResults = results[1][0];  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
            next();
        }
    }

    model.insertTaskProgress(data, callback);
}

module.exports.getTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getTaskProgressById: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // progress_id does not exist
            res.status(404).json({
                "message": `progress_id ${data.progress_id} does not exist`
            });
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.selectTaskProgress(data, callback);
}

module.exports.updateTaskProgressById = (req, res, next) => {
    if (req.body.notes == undefined) {
        res.status(400).json({
            "message": "notes is undefined"
        });
        return;  // end function
    }

    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateTaskProgressById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // taskprogress was not updated
            res.status(404).json({
                "message": `progress_id ${data.progress_id} does not exist`
            });
        } else {
            res.status(200).json(results[1][0]);  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
        }
    }

    model.updateTaskProgress(data, callback);
}

module.exports.deleteTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteTaskProgressById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // taskprogress was not deleted
            res.status(404).json({
                "message": `progress_id ${data.progress_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteTaskProgress(data, callback);
}
