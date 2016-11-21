const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const params = helper.document;
const userParams = helper.user;


const notNullAttrs = ['title', 'content', 'OwnerId'];

let document;

describe('Document model', () => {
  beforeEach(() =>
    db.Role.create(helper.role).then((role) => {
      const user = db.User.build(userParams);
      user.RoleId = role.id;
      return user.save()
        .then((owner) => {
          document = db.Document.build(params);
          document.OwnerId = owner.id;
        });
    })
  );

  // clear DB after each test
  afterEach(() => db.Document.sequelize.sync({ force: true }));

  describe('Create document', () => {
    it('creates a Document instance', () =>
      expect(document).to.exist);

    it('has both title and content', () => {
      expect(document.title).to.equal(params.title);
      expect(document.content).to.equal(params.content);
    });

    it('saves document with valid attributes', () =>
      document.save().then((newDoc) => {
        expect(newDoc.title).to.equal(document.title);
        expect(newDoc.content).to.equal(document.content);
      }).catch(err => expect(err).to.not.exist));

    it('sets default access to public', () =>
      document.save().then((newDoc) => {
        expect(newDoc.access).to.equal('public');
      }).catch(err => expect(err).to.not.exist));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          document[attr] = null;

          return document.save()
            .then(newDoc => expect(newDoc).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    it('fails for invalid access', () => {
      document.access = 'invalid access';
      return document.save()
        .then(newDoc => expect(newDoc).to.not.exist)
        .catch(err =>
          expect(/isIn failed/.test(err.message)).to.be.true);
    });
  });
});
