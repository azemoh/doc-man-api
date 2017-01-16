const expect = require('chai').expect;
const Type = require('../../app/models').Type;
const typeParams = require('../test.helper').type;

let type;

describe('Type model', () => {
  before(() => {
    type = Type.build(typeParams);
  });

  // clear DB after each test
  after(() => Type.sequelize.sync({ force: true }));

  describe('Create type', () => {
    it('creates a Type instance', () =>
      expect(type).to.exist);

    it('has a title', () => {
      expect(type.title).to.equal(typeParams.title);
    });

    it('saves type with valid attributes', () =>
      type.save().then(newType =>
        expect(newType.title).to.equal(type.title)));
  });

  describe('Validations', () => {
    it('fails without a title', () =>
      Type.create({})
        .then(newType => expect(newType).to.not.exist)
        .catch(err =>
          expect(/notNull/.test(err.message)).to.be.true)
    );

    it('fails for non unique title', () =>
      type.save()
        .then(() => Type.create(typeParams))
        .then(newType => expect(newType).to.not.exist)
        .catch(err =>
          expect(/UniqueConstraintError/.test(err.name)).to.be.true)
    );
  });
});
