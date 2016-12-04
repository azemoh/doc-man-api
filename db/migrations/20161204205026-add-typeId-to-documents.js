module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Documents', 'TypeId', Sequelize.INTEGER);
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Documents', 'RoleId');
  }
};
