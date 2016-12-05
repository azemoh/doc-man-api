const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const userParams = helper.user;

let type, token;

describe('Types API Endpoint', () => {
  describe('With existing type', () => {
    beforeEach(() =>
      db.Role.create(helper.role)
        .then((role) => {
          userParams.RoleId = role.id;
          return db.User.create(userParams)
            .then(() =>
              db.Type.create(helper.type).then((newType) => {
                type = newType;
                request.post('/users/login')
                  .send(userParams)
                  .end((err, res) => {
                    token = res.body.token;
                  });
              }));
        }));

    afterEach(() => db.Type.sequelize.sync({ force: true }));

    describe('Get all GET: /types', () => {
      it('should return unauthorised for no token', (done) => {
        request.get('/types')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all types', (done) => {
        request.get('/types')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.be.true;
            expect(res.body.length).to.not.equal(0);
            done();
          });
      });
    });

    describe('Get type GET: /types/:id', () => {
      it('should get correct type', (done) => {
        request.get(`/types/${type.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(type.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/types/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit type PUT: /types/:id', () => {
      it('updates the type attributes', (done) => {
        const newAttributes = { title: 'New title' };

        request.put(`/types/${type.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(newAttributes.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/types/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete type DELETE: /types/:id', () => {
      it('deletes the type', (done) => {
        request.delete(`/types/${type.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            db.Type.count().then((count) => {
              expect(count).to.equal(0);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/types/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });
  });

  describe('Without existing type', () => {
    afterEach(() => db.Type.sequelize.sync({ force: true }));

    describe('Create types POST: /types', () => {
      it('should return unauthorised for no token', (done) => {
        request.post('/types')
          .send(helper.type)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('creates a new type', (done) => {
        request.post('/types')
          .set({ Authorization: token })
          .send(helper.type)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.title).to.equal(helper.type.title);
            done();
          });
      });

      it('fails for invalid type attributes', (done) => {
        const invalidParams = { name: 'type' };
        request.post('/types')
          .set({ Authorization: token })
          .send(invalidParams)
          .expect(400, done);
      });
    });
  });
});
