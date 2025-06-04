const express = require('express');
const { uploadNotification, updateNotification, deleteNotification } = require('../../Controllers/admin/notificationsController.js');
const upload = require('../../Middleware/cloudinary.js');
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const router = express.Router();

router.post('/notification', verify, restrictTo('admin'), upload.single('file'), uploadNotification);
router.put('/notification/:id', verify, restrictTo('admin'), upload.single('file'), updateNotification);
router.delete('/notification/:id', verify, restrictTo('admin'), deleteNotification)

module.exports = router