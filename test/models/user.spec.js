const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const params = helper.user;
const roleParams = helper.role;

const notNullAttrs = ['firstName', 'lastName', 'email', 'password', 'RoleId'];
const uniqueAttrs = ['username', 'email'];

let user;

describe('User model', () => {
  beforeEach(() =>
    db.Role.build(roleParams).save()
      .then((role) => {
        user = db.User.build(params);
        user.RoleId = role.id;
      }));

  // clear DB after each test
  afterEach(() => db.User.sequelize.sync({ force: true }));

  describe('Create user', () => {
    it('creates a User instance', () =>
      expect(user).to.exist);

    it('has both first and last name', () => {
      expect(user.firstName).to.equal(params.firstName);
      expect(user.lastName).to.equal(params.lastName);
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
          user.save().then((newUser) => {
            const user2 = db.User.build(params);
            user2.RoleId = newUser.RoleId;

            return user2.save()
              .then(newUser2 => expect(newUser2).to.not.exist)
              .catch(err =>
                expect(/SequelizeUniqueConstraintError/.test(err.name)).to.be.true);
          }));
      });
    });
  });
});
