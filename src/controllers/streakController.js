const model = require('../models/streakModel');

/// GET /streak/{user_id} ///
/// POST /task_progress ///
module.exports.getUserCompletionDates = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getUserStreak: ', error)
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                "message": `user_id ${req.params.user_id} has not completed any tasks`
            });
        } else {
            res.locals.results = results;
            next();
        }
    }

    model.selectUserCompletionDates(data, callback);
}

/// GET /streak/{user_id} ///
/// POST /task_progress ///
module.exports.getUserFreezeStreaks = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getUserFreezeStreaks: ', error)
            res.status(500).json(error);
        } else {
            if (results.length != 0) {
                for (var i=0; i<results.length; i++) {
                    res.locals.results.push({completion_date: results[i].used_on});  // add used_on dates of freeze streaks to results to act as if user completed tasks on those dates
                }
            }
            next();
        }
    }

    model.selectUserFreezeStreaks(data, callback);
}

/// GET /streak/{user_id} ///
/// POST /task_progress ///
module.exports.calculateUserStreak = (req, res, next) => {
    const results = res.locals.results;
    var completion_dates = [];
    var streak = 0;
    
    for (var i=0; i<results.length; i++) {
        const date = results[i].completion_date.slice(0, 10);  // get only the yyyy-mm-dd part of the date
        completion_dates.push(date);
    }

    const unique_completion_dates = [...new Set(completion_dates)];  // get only unique dates

    const today = new Date().toJSON().slice(0, 10);  // toJSON() returns yyyy-mm-ddThh:mm:ss.sssZ, so slice(0, 10) gets only the yyyy-mm-dd part of the date
    
    unique_completion_dates.push(today);

    unique_completion_dates.sort((a, b) => {
        return new Date(a) - new Date(b);  // sort in ascending order
    });

    for (var k=unique_completion_dates.length-1; k>0; k--) {  // get from the last index to the second index
        if (((new Date(unique_completion_dates[k])).getTime()) - ((new Date(unique_completion_dates[k-1])).getTime()) <= 86400000) {  // if difference is less than or equal to a day
            streak++;
        } else {
            k = -1;  // break out of loop
        }
    }

    res.locals.streak = streak;
    next();    
}

/// GET /streak/{user_id} ///
/// POST /task_progress ///
module.exports.addUserStreak = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        streak: res.locals.streak
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in addUserStreak: ', error)
            res.status(500).json(error);
        } else {
            if (res.locals.taskProgress) {  // if code is ran in taskProgressControler.js
                res.status(201).json(res.locals.taskProgressResults);
            } else {  // if code is ran in streakController.js
                res.status(200).json(results[1][0]);
            }
        }
    }

    model.insertUserStreak(data, callback);
}