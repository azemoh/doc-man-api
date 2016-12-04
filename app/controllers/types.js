const db = require('../models');

const typesCtrl = {
  /**
   * Get all types
   * Route: GET: /types
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  index(req, res) {
    db.Type.findAll().then((types) => {
      res.send(types);
    });
  },

  /**
   * Create a type
   * Route: POST: /types
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  create(req, res) {
    db.Type.create(req.body)
      .then((type) => {
        res.send(type);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },
};

module.exports = typesCtrl;
