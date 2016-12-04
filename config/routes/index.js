const users = require('./users');
const documents = require('./documents');
const roles = require('./roles');

module.exports = (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.send({ message: 'Document Management API' });
  });

  app.use('/roles', roles);
  app.use('/users', users);
  app.use('/documents', documents);
};
