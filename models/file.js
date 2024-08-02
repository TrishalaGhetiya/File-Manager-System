module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s3Key: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  File.associate = function(models) {
    File.belongsTo(models.User, { foreignKey: 'userId' });
    File.belongsTo(models.Folder, { foreignKey: 'folderId' });
  };

  return File;
};
