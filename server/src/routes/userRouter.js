const express = require('express');
const UserController = require('../controllers/userController');
const isIdValid = require('../middlewares/isIdValid');

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', isIdValid('userId'), UserController.getOneUser);

userRouter.get('/:userId/words/', isIdValid('userId'), UserController.getLikedWords);

module.exports = userRouter;