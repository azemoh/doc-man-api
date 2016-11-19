module.exports = (sequelize, DataTypes) =>
  sequelize.define('Document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
