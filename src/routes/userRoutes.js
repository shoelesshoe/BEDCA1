const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.checkEmailExists, userController.checkUsernameExists, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.checkUserExists, userController.getUserByIdWithTotalPoints, userController.getUserByIdWithoutTotalPoints);
router.put('/:user_id', userController.checkEmailAssociation, userController.checkUsernameAssociation, userController.updateUserById);
router.delete('/:user_id', userController.deleteUserById);

module.exports = router;
