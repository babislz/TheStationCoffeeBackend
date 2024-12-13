const productController = require('../controller/productController');
const express = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/auth');
const upload = require('../middleware/upload');
const productRouter = express.Router();

productRouter.use(authenticate);

productRouter
    .post('', authorize('admin'), productController.create)
    .get('/:id', productController.getProdById)
    .get('', authorize(['admin', 'staff', 'client']), productController.getAllProducts)
    .delete('/:id', authorize('admin'), productController.deleteProductById)
    .delete('', authorize('admin'), productController.deleteAllProducts)
    .put('/:id', authorize('admin'), upload.single('image'), productController.updateProdById)

module.exports = productRouter;