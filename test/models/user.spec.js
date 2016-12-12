const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const userParams = helper.user;
const roleParams = helper.role;

const notNullAttrs = ['firstName', 'lastName', 'email', 'password', 'RoleId'];
const uniqueAttrs = ['username', 'email'];

let user;

describe('User model', () => {
  beforeEach(() =>
    db.Role.create(roleParams)
      .then((role) => {
        userParams.RoleId = role.id;
        user = db.User.build(userParams);
      }));

  // clear DB after each test
  afterEach(() => db.User.sequelize.sync({ force: true }));

  describe('Create user', () => {
    it('creates a User instance', () =>
      expect(user).to.exist);

    it('has both first and last name', () => {
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
    });

    it('saves user with valid attributes', () =>
      user.save().then(newUser =>
        expect(newUser.firstName).to.equal(user.firstName)));

    it('has a role defined', () =>
      user.save().then(newUser =>
        db.User.findById(newUser.id, { include: [db.Role] })
          .then((foundUser) => {
            expect(foundUser.Role.title).to.equal(roleParams.title);
          })));

    it('creates user and hashes password', () =>
      user.save().then(newUser =>
          expect(newUser.password).to.not.equal(userParams.password)));
  });

  describe('Update user', () => {
    it('hashes update password', () =>
      user.save()
        .then(newUser => newUser.update({ password: 'newpassword' }))
        .then((updatedUser) => {
          expect(updatedUser.password).to.not.equal('newpassword');
        }));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          user[attr] = null;

          return user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    describe('UNIQUE attributes', () => {
      uniqueAttrs.forEach((attr) => {
        it(`fails for non unique ${attr}`, () =>
          user.save()
            .then((newUser) => {
              userParams.RoleId = newUser.RoleId;
              return db.User.build(userParams).save();
            })
            .then(newUser2 => expect(newUser2).to.not.exist)
            .catch(err =>
              expect(/UniqueConstraintError/.test(err.name)).to.be.true));
      });
    });

    it('fails for invalid email', () => {
      user.email = 'invalid email';
      return user.save()
        .then(newUser => expect(newUser).to.not.exist)
        .catch(err =>
          expect(/isEmail failed/.test(err.message)).to.be.true);
    });
  });

  describe('user.validPassword', () => {
    it('valid for correct password', () =>
      user.save().then(newUser =>
        expect(newUser.validPassword(userParams.password)).to.be.true));

    it('invalid for incorrect password', () =>
      user.save().then(newUser =>
        expect(newUser.validPassword('invalid password')).to.be.false));
  });
});
