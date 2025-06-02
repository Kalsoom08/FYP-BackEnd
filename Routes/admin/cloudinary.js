const express = require('express');
const upload = require('../../Middleware/cloudinary');
const uploadController = require('../../Controllers/admin/cloudinary');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadController);

module.exports = router;
