const users = require('./users');
const documents = require('./documents');
const roles = require('./roles');
const types = require('./types');

module.exports = (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.send({ message: 'Document Management API' });
  });

  app.use('/roles', roles);
  app.use('/users', users);
  app.use('/types', types);
  app.use('/documents', documents);
};
