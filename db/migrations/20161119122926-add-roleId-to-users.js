module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'RoleId', Sequelize.INTEGER);
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Users', 'RoleId');
  }
};
