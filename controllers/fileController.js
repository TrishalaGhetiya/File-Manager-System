const s3 = require('../config/s3');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const File = require('../models/file');
const Folder = require('../models/folder');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

exports.createFolder = async (req, res) => {
    const { folderName, parentId } = req.body;
    const userId = req.user.id;

    try {
        const folder = await Folder.create({ folderName, parentId, userId });
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

exports.getFoldersAndFiles = async (req, res) => {
    const parentId = req.params.parentId || null;
    const userId = req.user.id;

    try {
        const folders = await Folder.findAll({ where: { parentId, userId } });
        const files = await File.findAll({ where: { folderId: parentId, userId } });
        res.status(200).json({ folders, files });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const file = req.file;
        const { folderId } = req.body;
        const userId = req.user.id;

        const s3Key = crypto.randomBytes(20).toString('hex') + path.extname(file.originalname);
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        s3.upload(params, async (err, data) => {
            if (err) return res.status(500).json({ error: err.message });

            try {
                const newFile = await File.create({ fileName: file.originalname, s3Key, folderId, userId });
                res.status(200).json({ message: 'File uploaded successfully', fileId: newFile.id });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    });
};

exports.deleteFile = async (req, res) => {
    const fileId = req.params.id;
    const userId = req.user.id;

    try {
        // Find the file in the database
        const file = await File.findOne({ where: { id: fileId, userId } });
        if (!file) return res.status(404).json({ error: 'File not found' });

        // Delete the file from S3
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.s3Key,
        };

        s3.deleteObject(params, async (err, data) => {
            if (err) return res.status(500).json({ error: err.message });

            // Delete the file record from the database
            await file.destroy();
            res.status(200).json({ message: 'File deleted successfully from S3 and database' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renameFile = async (req, res) => {
    const { fileId, newName } = req.body;
    const userId = req.user.id;

    try {
        // Find the file in the database
        const file = await File.findOne({ where: { id: fileId, userId } });
        if (!file) return res.status(404).json({ error: 'File not found' });

        // Update the file name in the database
        file.fileName = newName;
        await file.save();

        res.status(200).json({ message: 'File renamed successfully', file });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.moveFile = async (req, res) => {
    const { fileId, newFolderId } = req.body;
    const userId = req.user.id;

    try {
        // Find the file in the database
        const file = await File.findOne({ where: { id: fileId, userId } });
        if (!file) return res.status(404).json({ error: 'File not found' });

        // Update the folderId in the database
        file.folderId = newFolderId;
        await file.save();

        res.status(200).json({ message: 'File moved successfully', file });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
