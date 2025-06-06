const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restricTo = require('../../Middleware/restrictToMiddleware.js');
const { uploadResultFromXlsx } = require('../../Controllers/admin/resultController.js');
const router = express.Router();

router.post('/results/upload-xlsx',verify, restricTo('admin'), upload.single('file'), uploadResultFromXlsx);

module.exports = router;