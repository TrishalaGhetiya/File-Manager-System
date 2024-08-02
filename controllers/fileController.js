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

exports.deleteFolder = async (req, res) => {
    const folderId = req.params.id;
    const userId = req.user.id;

    try {
        const folder = await Folder.findOne({ where: { id: folderId, userId } });
        if (!folder) return res.status(404).json({ error: 'Folder not found' });

        await folder.destroy();
        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};