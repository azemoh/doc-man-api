const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const documentParams = helper.publicDocument;
const privateDocumentParams = helper.privateDocument;
const roleDocumentParams = helper.roleDocument;
const documentParamsArray = helper.documentArray();
const userParams = helper.firstUser;
const ownerParams = helper.secondUser;

let document, privateDocument, roleDocument, user, owner, adminRole, regularRole, token, ownerToken;

describe('Document API', () => {
  before((done) => {
    db.Role.bulkCreate([helper.regularRole, helper.adminRole], {
      returning: true
    }).then((newRoles) => {
      adminRole = newRoles[0];
      regularRole = newRoles[1];
      userParams.RoleId = regularRole.id;
      ownerParams.RoleId = adminRole.id;

      request.post('/users')
        .send(userParams)
        .end((err, res) => {
          user = res.body.user;
          token = res.body.token;
          documentParams.OwnerId = user.id;
          done();
        });
    });
  });

  after(() => db.Document.sequelize.sync({ force: true }));

  describe('CONTEXT: With existing document', () => {
    beforeEach(() =>
      db.Document.create(documentParams)
        .then((newDocument) => {
          document = newDocument;
        }));

    afterEach(() => db.Document.destroy({ where: {} }));

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

    describe('Get Document GET: /documents/:id', () => {
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

  describe('CONTEXT: Without existing document', () => {
    before((done) => {
      request.post('/users')
        .send(ownerParams)
        .end((err, res) => {
          owner = res.body.user;
          ownerToken = res.body.token;
          done();
        });
    });

    describe('Get Private document GET: /documents/:id', () => {
      before(() => {
        privateDocumentParams.OwnerId = owner.id;

        return db.Document.create(privateDocumentParams)
          .then((newPrivateDocument) => {
            privateDocument = newPrivateDocument;
          });
      });

      it('should return permission denied if not owner', (done) => {
        request.get(`/documents/${privateDocument.id}`)
          .set({ Authorization: token })
          .expect(403, done);
      });

      it('should return document for owner', (done) => {
        request.get(`/documents/${privateDocument.id}`)
          .set({ Authorization: ownerToken })
          .expect(200, done);
      });
    });

    describe('Get role document GET: /documents/:id', () => {
      before(() => {
        roleDocumentParams.OwnerId = owner.id;

        return db.Document.create(roleDocumentParams)
          .then((newRoleDocument) => {
            roleDocument = newRoleDocument;
          });
      });

      it('should return permission denied if in different role', (done) => {
        request.get(`/documents/${roleDocument.id}`)
          .set({ Authorization: token })
          .expect(403, done);
      });

      it('should return document for owner', (done) => {
        const sameRoleUserParams = helper.thirdUser;
        sameRoleUserParams.RoleId = adminRole.id;

        request.post('/users')
          .send(sameRoleUserParams)
          .end((err, res) => {
            const sameRoleUserToken = res.body.token;

            request.get(`/documents/${roleDocument.id}`)
              .set({ Authorization: sameRoleUserToken })
              .expect(200, done);
          });
      });
    });

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
        const invalidParams = { name: 'new document' };
        request.post('/documents')
          .set({ Authorization: token })
          .send(invalidParams)
          .expect(400, done);
      });
    });
  });

  describe('CONTEXT: With multiple documents', () => {
    before(() => db.Document.bulkCreate(documentParamsArray));

    describe('Document Pagination', () => {
      it('uses query params "limit" to limit the result', (done) => {
        request.get('/documents?limit=5')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(5);
            done();
          });
      });
    });

    describe('Document search', () => {
      it('searchs and returns the correct documents', (done) => {
        const query = documentParamsArray[4].content.substr(0, 10);
        const matcher = new RegExp(query);

        request.get(`/documents/search?query=${query}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(matcher.test(res.body[0].content)).to.be.true;
            done();
          });
      });
    });
  });
});
