const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');
const upload = require('../config/multerConfig');

// POST /documents
router.post('/documents', upload.array('files'), docController.uploadDocuments);
// GET /documents - List, Search, and Pagination
router.get('/documents', docController.getDocuments);
module.exports = router;