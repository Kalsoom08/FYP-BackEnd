const express = require('express');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const upload = require('../../Middleware/cloudinary.js');
const { uploadDateSheet,
        updateDateSheet,
        deleteDateSheet } = require('../../Controllers/admin/dateSheetController.js');

const router = express.Router();
router.post('/exams/datesheet', verify, restrictTo('admin'), upload.single('file'), uploadDateSheet);
router.put('/exams/datesheet/:id', verify, restrictTo('admin'), upload.single('file'), updateDateSheet);
router.delete('/exams/datesheet/:id', verify, restrictTo('admin'), deleteDateSheet);
module.exports = router;