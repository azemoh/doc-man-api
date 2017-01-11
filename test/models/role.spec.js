const expect = require('chai').expect;
const Role = require('../../app/models').Role;
const roleParams = require('../test.helper').role;

let role;

describe('Role model', () => {
  beforeEach(() => {
    role = Role.build(roleParams);
  });

  // clear DB after each test
  afterEach(() => Role.sequelize.sync({ force: true }));

  describe('Create role', () => {
    it('creates a Role instance', () =>
      expect(role).to.exist);

    it('has a title', () => {
      expect(role.title).to.equal(roleParams.title);
    });

    it('saves role with valid attributes', () =>
      role.save().then(newRole =>
        expect(newRole.title).to.equal(role.title)));
  });

  describe('Validations', () => {
    it('fails without a title', () =>
      Role.create({})
        .then(newRole => expect(newRole).to.not.exist)
        .catch(err =>
          expect(/notNull/.test(err.message)).to.be.true)
    );

    it('fails for non unique title', () =>
      role.save()
        .then(() => Role.create(roleParams))
        .then(newRole => expect(newRole).to.not.exist)
        .catch(err =>
          expect(/UniqueConstraintError/.test(err.name)).to.be.true));
  });
});
