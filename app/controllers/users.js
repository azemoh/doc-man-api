const db = require('../models');

const usersCtrl = {
  index(req, res) {
    db.User.findAll().then((users) => {
      res.send(users);
    });
  }
};

module.exports = usersCtrl;
