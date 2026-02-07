const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');
const upload = require('../config/multerConfig');

// POST /documents
router.post('/documents', upload.array('files'), docController.uploadDocuments);

module.exports = router;