const express = require('express');
const productRouter = require('../src/routes/product');
const authRouter = require('../src/routes/auth');
const clientRouter = require('../src/routes/client');

module.exports = function (app) {
    app
        .use(express.json())
        .use(authRouter)
        .use(productRouter)
        .use(clientRouter)
}
