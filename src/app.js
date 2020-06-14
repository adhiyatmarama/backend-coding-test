'use strict';

const express = require('express');
const app = express();

const Logger = require('../services/logger_service');
const logger = new Logger('app');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const ridesRoute = require('./routes/ridesRoute');

module.exports = (db) => {
    app.get('/health', (req, res) => {
        logger.info('request recevied at /health');
        res.send('Healthy');
    });

    app.use('/rides', jsonParser, ridesRoute);

    return app;
};

// function bringLogger(req, res, next){
//     req.logger = logger;
//     next();
// }