const model = require('../models/leaderboardModel');

/// GET /leaderboard/streak ///
module.exports.getStreakLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getStreakLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                "Top 3 users with the highest streak (in order)": results
            });
        }
    }

    model.selectStreakLeaderboard(callback);
}

/// GET /leaderboard/complete_tasks ///
module.exports.getCompleteTasksLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getCompleteTasksLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                "Top 3 users with the most number of complete tasks (in order)": results
            });
        }
    }

    model.selectCompleteTasksLeaderboard(callback);
}

/// GET /leaderboard/points ///
module.exports.getPointsLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getPointsLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                "Top 3 users with the highest points earned (in order)": results
            });
        }
    }

    model.selectPointsLeaderboard(callback);
}

/// GET /leaderboard/plant_level ///
module.exports.getPlantLevelLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getPlantLevelLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                "Top 3 users with the highest plant level (in order)": results
            });
        }
    }

    model.selectPlantLevelLeaderboard(callback);
}