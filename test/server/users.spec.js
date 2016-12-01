const app = require('../../config/app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const params = helper.user;
const roleParams = helper.role;

let user, token;

describe('User API', () => {
  describe('With existing user', () => {
    beforeEach(() =>
      db.Role.create(roleParams)
        .then((role) => {
          params.RoleId = role.id;
          return db.User.create(params)
            .then((newUser) => {
              user = newUser;
              request.post('/users/login')
                .send(params)
                .end((err, res) => {
                  token = res.body.token;
                });
            });
        }));

    // clear DB after each test
    afterEach(() => db.User.sequelize.sync({ force: true }));

    describe('Get All GET: /users', () => {
      it('should return unauthorised for no token', (done) => {
        request.get('/users')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all users', (done) => {
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

    describe('Get User GET: /users/:id', () => {
      it('should get correct user', (done) => {
        request.get(`/users/${user.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.email).to.equal(user.email);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit user PUT: /users/:id', () => {
      it('updates the user attributes', (done) => {
        const newAttributes = { lastName: 'Newman', email: 'newman@mail.com' };

        request.put(`/users/${user.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.lastName).to.equal(newAttributes.lastName);
            expect(res.body.email).to.equal(newAttributes.email);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete user DELETE: /users/:id', () => {
      it('deletes the user', (done) => {
        request.delete(`/users/${user.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            db.User.count().then((count) => {
              expect(count).to.equal(0);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Login POST: /users/login', () => {
      it('should return a token on sucessfull login', (done) => {
        request.post('/users/login')
          .send(params)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.token).to.exist;
            done();
          });
      });

      it('should fail for invalid credentials', (done) => {
        request.post('/users/login')
          .send({ email: 'fake@email.com', password: 'fakepass' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.token).to.not.exist;
            done();
          });
      });
    });

    describe('Logout POST: /users/logout', () => {
      it('logs out successfully', (done) => {
        request.post('/users/logout')
          .expect(200, done);
      });
    });
  });

  describe('Without existing user', () => {
    beforeEach(() =>
      db.Role.create(roleParams)
        .then((role) => {
          params.RoleId = role.id;
        }));

    // clear DB after each test
    afterEach(() => db.User.sequelize.sync({ force: true }));

    describe('Create user POST: /users', () => {
      it('creates a new user and returns a token', (done) => {
        request.post('/users')
          .send(params)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.token).to.exist;
            done();
          });
      });

      it('fails if user already exist', () =>
        db.User.create(params).then(() => {
          request.post('/users')
            .send(params)
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body.token).to.not.exist;
            });
        })
      );

      it('fails for invalid user attributes', (done) => {
        request.post('/users')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.token).to.not.exist;
            done();
          });
      });
    });
  });
});
