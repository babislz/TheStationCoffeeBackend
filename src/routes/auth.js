const express = require('express');
const UserController = require('../controller/userController');
const userRouter = express.Router();

userRouter
    .post('/api/user', UserController.create)
    .post('/api/user/login', UserController.login)
    .get('/api/users', UserController.getAllUsers)
    .get('/api/user', UserController.getUser) 

module.exports = userRouter;
