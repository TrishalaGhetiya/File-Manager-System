const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authenticateToken } = require('../config/authentication');

router.get('/', authenticateToken, searchController.search);

module.exports = router;
