const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(logger('dev'));

// Mount routes
require('./routes')(app);

module.exports = app;
