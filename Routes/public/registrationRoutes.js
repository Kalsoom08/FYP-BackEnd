const express = require('express')
const router = express.Router()
const {getAllStudents, getStudentByRegNumber} = require('../../Controllers/public/registrationController')

router.get('/status', getAllStudents)
router.get('/status/:regNumber',getStudentByRegNumber )

module.exports = router
