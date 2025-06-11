const express = require('express')
const router = express.Router()
const upload = require('../../Middleware/cloudinary')
const verify = require('../../Middleware/verifyAdminMiddleware.js')
const restricTo  = require('../../Middleware/restrictToMiddleware.js')
const {uploadRegistrationStatus, updateRegistrationStatus, deleteRegistrationStatus} = require('../../Controllers/admin/registrationController.js')

router.post('/status',verify, restricTo('admin'), upload.single('file'), uploadRegistrationStatus)
router.put('/status/:id', upload.single('file'), updateRegistrationStatus)
router.delete('/status/:id', deleteRegistrationStatus)

module.exports = router