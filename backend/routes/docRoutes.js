const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

const uploadController = require('../controllers/uploadController');
const listController = require('../controllers/listController');
const downloadController = require('../controllers/downloadController');

// 1. Upload Route
router.post('/documents', upload.array('files'), uploadController.uploadDocuments);

// 2. List & Search Route
router.get('/documents', listController.getDocuments);

// 3. Download Route
router.get('/documents/:id/download', downloadController.downloadDocument);
module.exports = router;