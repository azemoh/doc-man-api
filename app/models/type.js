module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    title: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Type.hasMany(models.Document);
      }
    }
  });
  return Type;
};
