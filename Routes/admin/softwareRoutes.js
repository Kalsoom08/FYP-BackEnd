const express = require('express')
const router = express.Router()
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const {uploadSoftware, updateSoftware, deleteSoftware} = require('../../Controllers/admin/softwareController.js')

router.post('/software', verify, restrictTo('admin'),uploadSoftware)
router.put('/software/:id',verify, restrictTo('admin'), updateSoftware)
router.delete('/software/:id',verify, restrictTo('admin'),deleteSoftware)


module.exports = router