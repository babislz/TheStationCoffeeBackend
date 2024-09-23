const express = require('express');
const clientController = require('../controller/clientController');

const clientRouter = express.Router();

clientRouter.get('/api/client/table', clientController.getTable);
// http://localhost:8080/api/client/table?id=<tableId>&user=<clientUserId>

module.exports = clientRouter;
