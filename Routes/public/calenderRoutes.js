const {getCalender} = require('../../Controllers/public/calenderController')
const express = require('express')
const router = express.Router()

router.get('/calender', getCalender)

module.exports = router