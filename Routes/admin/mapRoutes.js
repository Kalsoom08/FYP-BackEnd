const express = require('express');
const { uploadCampusMap, getCampusMap, deletCampusMap  } = require('../../Controllers/admin/mapController.js');
const upload = require('../../Middleware/cloudinary.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');

const router = express.Router();

router.post('/map/upload', verify, restrictTo('admin'), upload.single('map'), uploadCampusMap);
router.get('/map', verify, restrictTo('admin'), upload.single('map'), getCampusMap);
router.delete('/map', verify, restrictTo('admin'), upload.single('map'), deletCampusMap);

module.exports = router;