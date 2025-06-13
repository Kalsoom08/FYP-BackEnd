const express = require('express')
const router = express.Router()
const {uploadSubject, updateSubject,deleteSubject} = require('../../Controllers/admin/subjectContentController')
const upload = require('../../Middleware/cloudinary')
const verify = require('../../Middleware/verifyAdminMiddleware')
const restrictTo = require('../../Middleware/restrictToMiddleware')

router.post('/subject', verify, restrictTo('admin'),upload.single('file'), uploadSubject)
router.put('/subject/:id',verify, restrictTo('admin'), upload.single('file'), updateSubject)
router.delete('/subject/:id', verify, restrictTo('admin'), deleteSubject)


module.exports = router 