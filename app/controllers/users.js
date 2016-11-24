const db = require('../models');

const usersCtrl = {
  /**
   * Get all users
   * Route: GET: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  index(req, res) {
    db.User.findAll().then((users) => {
      res.send(users);
    });
  },

  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  create(req, res) {
    db.User.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(409)
            .send({ message: `User with email: ${req.body.email} already exist` });
        }

        db.User.create(req.body)
          .then((user) => {
            if (!user) {
              res.status(400).send({ message: 'Failed to create user' });
            }

            res.status(201).send(user);
          })
          .catch((err) => {
            res.status(400).send(err.errors);
          });
      });
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  show(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }

        res.send(user);
      });
  },

  /**
   * Update a particular user
   * Route: PUT: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  edit(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }

        user.update(req.body).then((updatedUser) => {
          res.send(updatedUser);
        });
      });
  },

  /**
   * Delete a particular user
   * Route: DELETE: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  destroy(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }

        user.destroy();
        res.send({ message: 'User deleted succeffully.' });
      });
  }
};

module.exports = usersCtrl;
