const users = require('./users');

module.exports = (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.send({ message: 'Document Management API' });
  });

  app.use('/users', users);
};
