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
        res.status(201).send(type);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get a particular type
   * Route: GET: /types/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void|Response} response object or void
   */
  show(req, res) {
    db.Type.findById(req.params.id)
      .then((type) => {
        if (!type) {
          return res.status(404)
            .send({ message: `Type with id: ${req.params.id} not found` });
        }

        res.send(type);
      });
  },

  /**
   * Update a particular type
   * Route: PUT: /types/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  edit(req, res) {
    db.Type.findById(req.params.id)
      .then((type) => {
        if (!type) {
          return res.status(404)
            .send({ message: `Type with id: ${req.params.id} not found` });
        }

        type.update(req.body)
          .then((updatedType) => {
            res.send(updatedType);
          });
      });
  },

  /**
   * Delete a particular type
   * Route: DELETE: /types/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  destroy(req, res) {
    db.Type.findById(req.params.id)
      .then((type) => {
        if (!type) {
          return res.status(404)
            .send({ message: `Type with id: ${req.params.id} not found` });
        }

        type.destroy()
          .then(() => res.send({ message: 'Type deleted successfully.' }));
      });
  }
};

module.exports = typesCtrl;
