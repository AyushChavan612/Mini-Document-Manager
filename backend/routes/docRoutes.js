const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

const bulkController = require('../controllers/bulkController');
const uploadController = require('../controllers/uploadController');
const listController = require('../controllers/listController');
const downloadController = require('../controllers/downloadController');

// Upload Route
router.post('/documents', upload.array('files'), uploadController.uploadDocuments);

// List & Search Route
router.get('/documents', listController.getDocuments);

// Download Route
router.get('/documents/:id/download', downloadController.downloadDocument);

// for bulk download
router.get('/bulk-download', bulkController.downloadZip);

module.exports = router;