const expect = require('chai').expect;
const models = require('../../app/models');

describe('Models', () => {
  it('User model exists', () => expect(models.User).to.be.ok);
});
