const {getAllRollNumbers, getRollNumberByName} = require('../../Controllers/public/rollNumberController')
const express = require('express')
const router = express.Router()

router.get('/rollnumber', getAllRollNumbers)
router.get('/rollnumber/name/:name', getRollNumberByName)


module.exports = router 