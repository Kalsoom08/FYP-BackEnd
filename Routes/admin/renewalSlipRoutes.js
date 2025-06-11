const express = require('express');
const { uploadRenewalSlip } = require('../../Controllers/admin/renewalSlipController.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const upload = require('../../Middleware/cloudinary.js');

const router = express.Router();

router.post('/renewal/upload', verify, restrictTo('admin'), upload.single('file'), uploadRenewalSlip);

module.exports = router;