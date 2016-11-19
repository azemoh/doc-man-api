module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Documents', 'OwnerId', Sequelize.INTEGER);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Documents', 'OwnerId');
  }
};
