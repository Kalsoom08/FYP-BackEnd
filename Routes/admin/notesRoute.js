const express = require('express')
const router = express.Router()
const upload = require('../../Middleware/cloudinary')
const verify = require('../../Middleware/verifyAdminMiddleware')
const restrictTo = require('../../Middleware/restrictToMiddleware')
const {uploadNotes} = require('../../Controllers/admin/notesController')

router.post('/notes', verify, restrictTo('admin'), upload.single('file'), uploadNotes)

module.exports = router

