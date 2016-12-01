const db = require('../models');

const documentsCtrl = {
  /**
   * Get all documents
   * Route: GET: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  index(req, res) {
    db.Document.findAll().then((documents) => {
      res.send(documents);
    });
  },

  /**
   * Create a document
   * Route: POST: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  create(req, res) {
    db.Document.create(req.body)
      .then((document) => {
        res.send(document);
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
   * @returns {Void|Response} response object or void
   */
  show(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        res.send(document);
      });
  },

  /**
   * Update a particular document
   * Route: PUT: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|Void} response object or void
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
   * @returns {Response|Void} response object or void
   */
  destroy(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        document.destroy();
        res.send({ message: 'Document deleted succeffully.' });
      });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /users/:id/documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
   */
  userDocuments(req, res) {
    db.Document.findAll({ where: { OwnerId: req.params.id } })
      .then((documents) => {
        res.send(documents);
      });
  }
};

module.exports = documentsCtrl;