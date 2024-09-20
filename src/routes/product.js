const productController = require('../controller/productController');
const express = require('express');
const productRouter = express.Router();

productRouter
    .post('/api/product', productController.create)
    .get('/api/product/:id', productController.getProdById)

module.exports = productRouter;