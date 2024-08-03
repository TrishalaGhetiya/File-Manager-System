const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Folder = require('./folder');
const File = require('./file');

const SharedItem = sequelize.define('SharedItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    fileId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: File,
            key: 'id',
        },
    },
    folderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Folder,
            key: 'id',
        },
    },
});

SharedItem.belongsTo(User, { foreignKey: 'userId' });
SharedItem.belongsTo(File, { foreignKey: 'fileId' });
SharedItem.belongsTo(Folder, { foreignKey: 'folderId' });

module.exports = SharedItem;
