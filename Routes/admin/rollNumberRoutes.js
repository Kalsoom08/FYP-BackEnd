const express = require('express')
const router = express.Router()
const upload = require('../../Middleware/cloudinary')
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const {uploadRollNumbers} = require('../../Controllers/admin/rollNumberController')



router.post('/rollnumber',verify, restrictTo('admin'), upload.single('file'), uploadRollNumbers)

module.exports = router