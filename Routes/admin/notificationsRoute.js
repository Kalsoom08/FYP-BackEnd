const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const { uploadNotification } = require('../../Controllers/admin/notificationsController.js');
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const router = express.Router();

router.post('/admin/notification', verify, restrictTo('admin'), upload.single('file'), uploadNotification);

module.exports = router