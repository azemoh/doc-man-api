const expect = require('chai').expect;
const User = require('../../app/models').User;

const params = {
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@mail.com',
  password: 'passjejkke'
};

const notNullAttrs = ['firstName', 'lastName', 'email', 'password'];
const uniqueAttrs = ['username', 'email'];

let user;

describe('User model', () => {
  beforeEach(() => {
    user = User.build(params);
    return User.sequelize.sync({ force: true });
  });

  // clear DB after each test
  afterEach(() => User.sequelize.sync({ force: true }));

  describe('Create', () => {
    it('creates a User instance', () =>
      expect(user).not.to.be.null);

    it('has both first and last name', () => {
      expect(user.firstName).to.equal(params.firstName);
      expect(user.lastName).to.equal(params.lastName);
    });

    it('saves user with valid attributes', () =>
      user.save().then(newUser =>
        expect(newUser.firstName).to.equal(user.firstName)));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          user[attr] = null;

          user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    describe('UNIQUE attributes', () => {
      uniqueAttrs.forEach((attr) => {
        it(`fails for non unique ${attr}`, () => {
          user.save();

          User.build(params).save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/SequelizeUniqueConstraintError/.test(err.name)).to.be.true);
        });
      });
    });
  });
});
