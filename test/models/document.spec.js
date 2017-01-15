const expect = require('chai').expect;
const db = require('../../app/models');
const helper = require('../test.helper');

const documentParams = helper.document;
const userParams = helper.user;


const notNullAttrs = ['title', 'content', 'OwnerId'];

let document;

describe('Document model', () => {
  before(() =>
    db.Role.create(helper.adminRole)
      .then((role) => {
        userParams.RoleId = role.id;
        return db.User.create(userParams);
      })
      .then((owner) => {
        documentParams.OwnerId = owner.id;
      }));

  beforeEach(() => {
    document = db.Document.build(documentParams);
  });

  // clear DB after each test
  after(() => db.Document.sequelize.sync({ force: true }));

  describe('Create document', () => {
    it('creates a Document instance', () => expect(document).to.exist);

    it('has both title and content', () => {
      expect(document.title).to.equal(documentParams.title);
      expect(document.content).to.equal(documentParams.content);
    });

    it('saves document with valid attributes', () =>
      document.save()
        .then((newDocument) => {
          expect(newDocument.title).to.equal(document.title);
          expect(newDocument.content).to.equal(document.content);
        }).catch(err => expect(err).to.not.exist));

    it('sets default access to public', () =>
      document.save()
        .then(newDocument => expect(newDocument.access).to.equal('public'))
        .catch(err => expect(err).to.not.exist));

    it('has a published date defined', () =>
      document.save()
        .then(newDocument => expect(newDocument.createdAt).to.exist)
        .catch(err => expect(err).to.not.exist));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          document[attr] = null;
          return document.save()
            .then(newDocument => expect(newDocument).to.not.exist)
            .catch(err => expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    it('fails for invalid access type', () => {
      document.access = 'invalid access';
      return document.save()
        .then(newDocument => expect(newDocument).to.not.exist)
        .catch(err => expect(/isIn failed/.test(err.message)).to.be.true);
    });
  });
});
