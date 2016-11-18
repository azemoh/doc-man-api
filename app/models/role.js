module.exports = (sequelize, DataTypes) =>
  sequelize.define('Role', {
    title: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
