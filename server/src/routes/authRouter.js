const AuthController = require('../controllers/authController');

const authRouter = require('express').Router();

authRouter.post('/signup', AuthController.signup);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);

authRouter.get('/refresh', AuthController.refresh)

module.exports = authRouter;