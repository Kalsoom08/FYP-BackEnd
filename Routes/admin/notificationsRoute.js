const express = require('express');
const { uploadNotification, updateNotification } = require('../../Controllers/admin/notificationsController.js');
const upload = require('../../Middleware/cloudinary.js');
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const router = express.Router();

router.post('/admin/notification', verify, restrictTo('admin'), upload.single('file'), uploadNotification);
router.put('/admin/notification/:id', verify, restrictTo('admin'), upload.single('file'), updateNotification);
module.exports = router