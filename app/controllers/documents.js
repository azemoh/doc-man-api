const db = require('../models');

const documentAccess = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  ROLE: 'role'
};

const documentsCtrl = {
  /**
   * Get all documents
   * Route: GET: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  index(req, res) {
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { OwnerId: req.decoded.UserId }
        ]
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    };

    db.Document.findAll(query).then((documents) => {
      res.send(documents);
    });
  },

  /**
   * Create a document
   * Route: POST: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  create(req, res) {
    db.Document.create(req.body)
      .then((document) => {
        res.status(201).send(document);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get a particular document
   * Route: GET: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  show(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        if ((document.access === documentAccess.PUBLIC) ||
          (document.OwnerId === req.decoded.UserId)) {
          return res.send(document);
        }

        db.User.findById(document.OwnerId)
          .then((owner) => {
            if (owner.RoleId === req.decoded.RoleId) {
              return res.send(document);
            }

            res.status(403)
              .send({ message: 'You cannot access this document.' });
          });
      });
  },

  /**
   * Update a particular document
   * Route: PUT: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        document.update(req.body)
          .then((updatedDocument) => {
            res.send(updatedDocument);
          });
      });
  },

  /**
   * Delete a particular document
   * Route: DELETE: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        document.destroy()
          .then(() => res.send({ message: 'Document deleted successfully.' }));
      });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /users/:id/documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  userDocuments(req, res) {
    db.Document.findAll({ where: { OwnerId: req.params.id } })
      .then((documents) => {
        res.send(documents);
      });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /search?query={}&published={}&role=1
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  search(req, res) {
    const queryString = req.query.query;
    const role = Math.abs(req.query.role, 10);
    const publishedDate = req.query.publishedDate;
    const order = publishedDate && /^ASC$/i.test(publishedDate)
            ? publishedDate : 'DESC';

    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { OwnerId: req.decoded.UserId }
        ] }],
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', order]]
    };

    if (queryString) {
      query.where.$and.push({ $or: [
        { title: { $like: `%${queryString}%` } },
        { content: { $like: `%${queryString}%` } }
      ] });
    }

    if (role) {
      query.include = [{
        model: db.User,
        as: 'Owner',
        attributes: [],
        include: [{
          model: db.Role,
          attributes: [],
          where: { id: role }
        }]
      }];
    }

    db.Document.findAll(query)
      .then((documents) => {
        res.send(documents);
      });
  }
};

module.exports = documentsCtrl;
