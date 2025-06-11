const express = require('express');
const { uploadRenewalSlip,
        getAllRenewalSlip,
        getRenewalSlip,
        deleteRenewalSlip,
        updateRenewalSlip
 } = require('../../Controllers/admin/renewalSlipController.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const upload = require('../../Middleware/cloudinary.js');

const router = express.Router();

router.post('/renewal/upload', verify, restrictTo('admin'), upload.single('file'), uploadRenewalSlip);
router.get('/renewal/slips', verify, restrictTo('admin'), upload.single('file'), getAllRenewalSlip);
router.get('/renewal/slip', verify, restrictTo('admin'), upload.single('file'), getRenewalSlip);
router.delete('/renewal/slip/:id', verify, restrictTo('admin'), upload.single('file'), deleteRenewalSlip);
router.put('/renewal/slip/:id', verify, restrictTo('admin'), upload.single('file'), updateRenewalSlip);

module.exports = router;