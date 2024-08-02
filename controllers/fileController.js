const { Folder } = require('../models');

exports.createFolder = async (req, res) => {
    const { name, parentId } = req.body;
    const userId = req.user.id;

    try {
        const folder = await Folder.create({ name, parentId, userId });
        res.status(201).json({ message: 'Folder created successfully', folderId: folder.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};