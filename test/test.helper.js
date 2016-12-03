if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}

module.exports = {
  role: {
    title: 'admin'
  },

  user: {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@mail.com',
    password: 'passjejkke'
  },

  user2: {
    username: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@mail.com',
    password: 'password'
  },

  document: {
    title: 'document 1',
    content: 'document 1 content'
  }
};
