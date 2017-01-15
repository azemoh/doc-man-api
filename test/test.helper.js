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
  user: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  user2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  document: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },

  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  }
};
