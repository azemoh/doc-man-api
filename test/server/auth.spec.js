const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const params = helper.firstUser;
const roleParams = helper.adminRole;

let token;

describe('Authorisation middleware', () => {
  before(() =>
    db.Role.create(roleParams)
      .then((role) => {
        params.RoleId = role.id;
        return db.User.create(params);
      })
      .then(() => {
        request.post('/users/login')
          .send(params)
          .end((err, res) => {
            token = res.body.token;
          });
      }));

  // clear DB after each test
  after(() => db.User.sequelize.sync({ force: true }));

  it('should return unauthorised without a token', (done) => {
    request.get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return unauthorised for invalid token', (done) => {
    request.get('/users')
      .set({ Authorization: 'invalid token' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return all users for valid token', (done) => {
    request.get('/users')
      .set({ Authorization: token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body.length).to.not.equal(0);
        done();
      });
  });
});
