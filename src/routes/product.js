const productController = require('../controller/productController');
const express = require('express');
const productRouter = express.Router();

productRouter
    .post('/api/product', productController.create)
    .delete('/api/product/:id', productController.deleteProductById)
    .put('/api/product/:id', productController.updateProdById)
    .get('/api/product/:id', productController.getProdById)
    .get('/api/product', productController.getAllProducts)

module.exports = productRouter;