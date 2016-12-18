const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const documnetParams = helper.document;
const userParams = helper.user;


const notNullAttrs = ['title', 'content', 'OwnerId'];

let document;

describe('Document model', () => {
  beforeEach(() =>
    db.Role.create(helper.role)
      .then((role) => {
        userParams.RoleId = role.id;
        return db.User.create(userParams);
      })
      .then((owner) => {
        documnetParams.OwnerId = owner.id;
        document = db.Document.build(documnetParams);
      }));

  // clear DB after each test
  afterEach(() => db.Document.sequelize.sync({ force: true }));

  describe('Create document', () => {
    it('creates a Document instance', () =>
      expect(document).to.exist);

    it('has both title and content', () => {
      expect(document.title).to.equal(documnetParams.title);
      expect(document.content).to.equal(documnetParams.content);
    });

    it('saves document with valid attributes', () =>
      document.save().then((newDocument) => {
        expect(newDocument.title).to.equal(document.title);
        expect(newDocument.content).to.equal(document.content);
      }).catch(err => expect(err).to.not.exist));

    it('sets default access to public', () =>
      document.save().then((newDocument) => {
        expect(newDocument.access).to.equal('public');
      }).catch(err => expect(err).to.not.exist));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          document[attr] = null;

          return document.save()
            .then(newDocument => expect(newDocument).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    it('fails for invalid access', () => {
      document.access = 'invalid access';
      return document.save()
        .then(newDocument => expect(newDocument).to.not.exist)
        .catch(err =>
          expect(/isIn failed/.test(err.message)).to.be.true);
    });
  });
});
