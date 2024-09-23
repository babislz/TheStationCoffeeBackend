const productController = require('../controller/productController');
const express = require('express');
const productRouter = express.Router();

productRouter
    .post('/api/product', productController.create)
    .get('/api/product/:id', productController.getProdById)
    .get('/api/products', productController.getAllProducts)
    .delete('/api/product/:id', productController.deleteProductById)
    .put('/api/product/:id', productController.updateProdById)

module.exports = productRouter;