const jwt = require('jsonwebtoken');
const db = require('../models');

const secret = process.env.SECRET_TOKEN || 'super duper secret';

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
            const token = jwt.sign({
              UserId: user.id,
              RoleId: user.RoleId
            }, secret, { expiresIn: 86400 });

            res.send({ token, expiresIn: 86400, user });
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

        user.update(req.body)
          .then((updatedUser) => {
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
  },

  /**
   * Login user
   * Route: POST: /users/login
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
   */
  login(req, res) {
    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && user.validPassword(req.body.password)) {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.RoleId
          }, secret, { expiresIn: 86400 });

          res.send({ token, expiresIn: 86400, user });
        } else {
          res.status(401)
            .send({ message: 'Failed to authenticate.' });
        }
      });
  },

  logout(req, res) {
    res.send({ message: 'Logout successful.' });
  }
};

module.exports = usersCtrl;
