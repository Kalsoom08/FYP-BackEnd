const express = require('express')
const router = express.Router()
const upload = require('../../Middleware/cloudinary')
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const {uploadCalender} = require('../../Controllers/admin/calenderController.js')

router.post('/calender', verify, restrictTo('admin'), upload.single('file'), uploadCalender)

module.exports = router