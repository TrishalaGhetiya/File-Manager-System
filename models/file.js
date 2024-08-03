const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Folder = require('./folder');

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    s3Key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

File.belongsTo(User, { foreignKey: 'userId' });
File.belongsTo(Folder, { foreignKey: 'folderId' });

module.exports = File;
