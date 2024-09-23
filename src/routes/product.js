const productController = require('../controller/productController');
const express = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/auth');
const productRouter = express.Router();

productRouter.use(authenticate);

productRouter
    .post('/api/product', authorize('admin'), productController.create)
    .get('/api/product/:id', authorize('admin'), productController.getProdById)
    .get('/api/products', authorize(['admin', 'staff', 'client']), productController.getAllProducts)
    .delete('/api/product/:id', authorize('admin'), productController.deleteProductById)
    .put('/api/product/:id', authorize('admin'), productController.updateProdById)

module.exports = productRouter;