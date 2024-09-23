const express = require('express');
const productRouter = require('../src/routes/product');
const authRouter = require('../src/routes/auth');
const clientRouter = require('../src/routes/client');
const tableRouter = require('../src/routes/table'); // Add this line

module.exports = function(app) {
    app 
        .use(express.json())
        .use(authRouter)
        .use(productRouter)
        .use(clientRouter)
        .use(tableRouter)
}
