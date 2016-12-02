const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const userParams = helper.user;

let token;

describe('Roles API', () => {
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

  afterEach(() => db.Role.sequelize.sync({ force: true }));

  describe('Get all GET: /roles', () => {
    it('should return unauthorised for no token', (done) => {
      request.get('/roles')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should return all roles', (done) => {
      request.get('/roles')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body.length).to.not.equal(0);
          done();
        });
    });
  });

  describe('Create document POST: /roles', () => {
    it('creates a new user and returns a token', (done) => {
      request.post('/roles')
        .set({ Authorization: token })
        .send({ title: 'regular' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('regular');
          done();
        });
    });

    it('fails for invalid document attributes', (done) => {
      request.post('/roles')
        .set({ Authorization: token })
        .send({})
        .expect(400, done);
    });
  });
});
