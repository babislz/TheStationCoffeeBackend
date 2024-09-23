const express = require('express');
const TableController = require('../controller/tableController');
const AuthMiddleware = require('../middleware/auth')

const tableRouter = express.Router();

tableRouter.post('/api/tables', AuthMiddleware, TableController.create);
tableRouter.get('/api/tables', AuthMiddleware, TableController.getAll);

module.exports = tableRouter;
