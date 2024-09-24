const express = require('express');
const orderController = require('../controller/orderController.js');

const orderRouter = express.Router();

orderRouter.post('/api/order', orderController.createOrder);

module.exports = orderRouter;