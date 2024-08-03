const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');
const { authenticateToken } = require('../config/authentication');

// Share a file with another user
router.post('/file', authenticateToken, shareController.shareFile);

// Share a folder with another user
router.post('/folder', authenticateToken, shareController.shareFolder);

//Get shared Items
router.get('/shared', authenticateToken, shareController.getSharedItems);

module.exports = router;
