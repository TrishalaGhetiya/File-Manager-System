const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Folder = sequelize.define('Folder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    folderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

Folder.belongsTo(User, { foreignKey: 'userId' });
Folder.hasMany(Folder, { as: 'subfolders', foreignKey: 'parentId' });
//Folder.belongsToMany(User, { through: SharedItem, foreignKey: 'folderId' });

module.exports = Folder;
