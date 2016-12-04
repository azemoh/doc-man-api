const db = require('../models');

const rolesCtrl = {
  /**
   * Get all roles
   * Route: GET: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  index(req, res) {
    db.Role.findAll().then((roles) => {
      res.send(roles);
    });
  },

  /**
   * Create a role
   * Route: POST: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  create(req, res) {
    db.Role.create(req.body)
      .then((role) => {
        res.send(role);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },
};

module.exports = rolesCtrl;
