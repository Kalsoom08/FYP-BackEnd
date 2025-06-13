const express = require('express')
const router = express.Router()
const {getAllSubjects, getSubjectBySemester} =  require('../../Controllers/public/subjectContentController')

router.get('/subject', getAllSubjects)
router.get('/subject/:semester', getSubjectBySemester)

module.exports = router