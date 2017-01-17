if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}
const faker = require('faker');

module.exports = {
  adminRole: {
    title: 'admin'
  },

  regularRole: {
    title: 'regular'
  },

  type: {
    title: 'legal'
  },

  firstUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  secondUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  thirdUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },

  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },

  roleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role'
  },

  documentArray() {
    const documentAttributes = [];

    for (let i = 0; i <= 10; i += 1) {
      documentAttributes.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 1
      });
    }

    return documentAttributes;
  }
};
