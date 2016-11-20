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

  document: {
    title: 'document 1',
    content: 'document 1 content'
  }
};
