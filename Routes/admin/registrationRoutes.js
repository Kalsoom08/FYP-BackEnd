const express = require('express')
const router = express.Router()
const upload = require('../../Middleware/cloudinary')
const {uploadRegistrationStatus} = require('../../Controllers/admin/registrationController.js')

router.post('/status', upload.single('file'), uploadRegistrationStatus)

module.exports = router