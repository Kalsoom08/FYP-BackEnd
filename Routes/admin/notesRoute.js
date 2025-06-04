const express = require('express')
const router = express.Router()
const upload = require('../../Middleware/cloudinary')
const verify = require('../../Middleware/verifyAdminMiddleware')
const restrictTo = require('../../Middleware/restrictToMiddleware')
const {uploadNotes, updateNotes, deleteNotes} = require('../../Controllers/admin/notesController')

router.post('/notes', verify, restrictTo('admin'), upload.single('file'), uploadNotes)
router.put('/notes', verify, restrictTo('admin'), upload.single('file'), updateNotes)
router.delete('/notes', verify, restrictTo('admin'), deleteNotes)
module.exports = router

