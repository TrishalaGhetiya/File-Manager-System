module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Folder.associate = function(models) {
    Folder.belongsTo(models.User, { foreignKey: 'userId' });
    Folder.hasMany(models.Folder, { foreignKey: 'parentId' });
    Folder.hasMany(models.File, { foreignKey: 'folderId' });
  };

  return Folder;
};
