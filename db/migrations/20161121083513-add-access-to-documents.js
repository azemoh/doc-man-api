module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Documents', 'access', {
      defaultValue: 'public',
      type: Sequelize.STRING
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Documents', 'access');
  }
};
