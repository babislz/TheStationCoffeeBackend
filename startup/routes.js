const express = require('express');
const productRouter = require('../src/routes/product');

module.exports = function(app) {
    app 
        .use(express.json())
        .use(productRouter)
}