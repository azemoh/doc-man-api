const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const userParams = helper.user;

let token;

describe('Types API Endpoint', () => {
  beforeEach(() =>
    db.Role.create(helper.role)
      .then((role) => {
        userParams.RoleId = role.id;
        return db.User.create(userParams)
          .then(() => {
            request.post('/users/login')
              .send(userParams)
              .end((err, res) => {
                token = res.body.token;
              });
          });
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
          done();
        });
    });
  });

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
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(helper.type.title);
          done();
        });
    });

    it('fails for invalid type attributes', (done) => {
      request.post('/types')
        .set({ Authorization: token })
        .send({})
        .expect(400, done);
    });
  });
});
