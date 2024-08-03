const File = require('../models/file');
const Folder = require('../models/folder');
const SharedItem = require('../models/sharedItem');

exports.shareFile = async (req, res) => {
    const { fileId, sharedUserId } = req.body;
    const userId = req.user.id;  // Assuming the authenticated user is the one sharing

    try {
        // Check if the file exists and belongs to the user
        const file = await File.findOne({ where: { id: fileId, userId } });
        if (!file) return res.status(404).json({ error: 'File not found or access denied' });

        // Create the sharing record
        await SharedItem.create({ userId: sharedUserId, fileId });

        res.status(200).json({ message: 'File shared successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.shareFolder = async (req, res) => {
    const { folderId, sharedUserId } = req.body;
    const userId = req.user.id;  // Assuming the authenticated user is the one sharing

    try {
        // Check if the folder exists and belongs to the user
        const folder = await Folder.findOne({ where: { id: folderId, userId } });
        if (!folder) return res.status(404).json({ error: 'Folder not found or access denied' });

        // Create the sharing record
        await SharedItem.create({ userId: sharedUserId, folderId });

        res.status(200).json({ message: 'Folder shared successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSharedItems = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    try {
        const sharedFiles = await File.findAll({
            include: [{
                model: SharedItem,
                where: { userId }
            }]
        });

        const sharedFolders = await Folder.findAll({
            include: [{
                model: SharedItem,
                where: { userId }
            }]
        });

        res.status(200).json({ sharedFiles, sharedFolders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

