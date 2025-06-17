const express = require('express');
const UserController = require('../controllers/userController');
const isIdValid = require('../middlewares/isIdValid');
const verifyAccessToken = require('../middlewares/verifyAccessToken')

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/likes', verifyAccessToken, UserController.getLikedWords);

userRouter.get('/:userId', isIdValid('userId'), UserController.getOneUser);

userRouter.post('/likes', verifyAccessToken, UserController.createLike);   // это относится к лайкам

userRouter.delete('/likes/:wordId', verifyAccessToken, UserController.deleteLike);   // это относится к лайкам

module.exports = userRouter;