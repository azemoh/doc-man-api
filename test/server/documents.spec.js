const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const documentParams = helper.document;
const userParams = helper.user;

let document, token;

describe('Document API', () => {
  describe('With existing document', () => {
    beforeEach(() =>
      db.Role.create(helper.role)
        .then((role) => {
          userParams.RoleId = role.id;
          return db.User.create(userParams);
        })
        .then((user) => {
          documentParams.OwnerId = user.id;
          return db.Document.create(documentParams);
        })
        .then((newDocument) => {
          document = newDocument;
          request.post('/users/login')
            .send(userParams)
            .end((err, res) => {
              token = res.body.token;
            });
        }));

    afterEach(() => db.Document.sequelize.sync({ force: true }));

    describe('Get all GET: /documents', () => {
      it('should return unauthorised without a token', (done) => {
        request.get('/documents')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all documents', (done) => {
        request.get('/documents')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.be.true;
            expect(res.body.length).to.not.equal(0);
            done();
          });
      });
    });

    describe('Get Document GET: /document/:id', () => {
      it('should get correct document', (done) => {
        request.get(`/documents/${document.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(document.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/documents/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit document PUT: /documents/:id', () => {
      it('updates the document attributes', (done) => {
        const newAttributes = { title: 'New title', content: 'new content' };

        request.put(`/documents/${document.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(newAttributes.title);
            expect(res.body.content).to.equal(newAttributes.content);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/documents/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete document DELETE: /documents/:id', () => {
      it('deletes the document', (done) => {
        request.delete(`/documents/${document.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            db.Document.count().then((count) => {
              expect(count).to.equal(0);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/documents/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Get all GET: /users/:id/documents', () => {
      it('should return all user documents', (done) => {
        request.get(`/users/${document.OwnerId}/documents`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.be.true;
            expect(res.body.length).to.not.equal(0);
            done();
          });
      });
    });
  });

  describe('Without existing document', () => {
    beforeEach(() =>
      db.Role.create(helper.role)
        .then((role) => {
          userParams.RoleId = role.id;
          return db.User.create(userParams);
        })
        .then((user) => {
          documentParams.OwnerId = user.id;
        }));

    afterEach(() => db.Document.sequelize.sync({ force: true }));

    describe('Create document POST: /document', () => {
      it('creates a new document', (done) => {
        request.post('/documents')
          .set({ Authorization: token })
          .send(documentParams)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.title).to.equal(documentParams.title);
            done();
          });
      });

      it('fails for invalid document attributes', (done) => {
        const invalidParams = {};
        request.post('/documents')
          .set({ Authorization: token })
          .send(invalidParams)
          .expect(400, done);
      });
    });
  });
});
