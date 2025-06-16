const express = require('express');
const UserController = require('../controllers/userController');
const isIdValid = require('../middlewares/isIdValid');
const verifyAccessToken = require('../middlewares/verifyAccessToken')

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', isIdValid('userId'), UserController.getOneUser);

userRouter.get('/likes', verifyAccessToken, UserController.getLikedWords);

userRouter.post('/likes', verifyAccessToken, UserController.createLike);   // это относится к лайкам

module.exports = userRouter;