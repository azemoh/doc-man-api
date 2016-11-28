const users = require('./users');
const documents = require('./documents');

module.exports = (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.send({ message: 'Document Management API' });
  });

  app.use('/users', users);
  app.use('/documents', documents);
};
