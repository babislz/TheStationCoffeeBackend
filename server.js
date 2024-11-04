const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

require('./startup/db')();

app.use(cors({
    origin: '*'
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

require('./startup/routes')(app);

const port = 8080;

const server = app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));

module.exports = server;
