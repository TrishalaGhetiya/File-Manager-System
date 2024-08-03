const File = require('../models/file');
const Folder = require('../models/folder');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
    const { query } = req.query;  // Get the search query from the request
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        // Search for files
        const files = await File.findAll({
            where: {
                fileName: {
                    [Op.like]: `%${query}%`,
                },
            },
        });

        // Search for folders
        const folders = await Folder.findAll({
            where: {
                folderName: {
                    [Op.like]: `%${query}%`,
                },
            },
        });

        res.status(200).json({ files, folders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
