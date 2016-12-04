module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    OwnerId: DataTypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    TypeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          as: 'Owner',
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });

        Document.belongsTo(models.Type, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: true }
        });
      }
    }
  });

  return Document;
};
