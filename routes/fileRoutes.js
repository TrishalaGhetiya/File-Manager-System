const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { authenticateToken } = require('../config/authentication');

// Folder routes
router.post('/folder', authenticateToken, fileController.createFolder);
router.get('/folders/:parentId?', authenticateToken, fileController.getFoldersAndFiles);
router.delete('/folder/:id', authenticateToken, fileController.deleteFolder);

// File routes
router.post('/file', authenticateToken, fileController.uploadFile);

module.exports = router;
