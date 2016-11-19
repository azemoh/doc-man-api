const expect = require('chai').expect;
const models = require('../../app/models');

describe('Models', () => {
  it('User model exists', () => expect(models.User).to.exist);
  it('Role model exists', () => expect(models.Role).to.exist);
  it('Document model exists', () => expect(models.Document).to.exist);
});
