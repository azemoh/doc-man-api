const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 4000;

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(logger('dev'));

// Mount routes
require('./config/routes')(app);

// Start server
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

module.exports = app;
