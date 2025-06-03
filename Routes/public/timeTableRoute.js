const express = require('express');
const { getTimeTable } = require('../../Controllers/public/timeTableController.js');

const router = express.Router();

router.get('/timetable', getTimeTable);
module.exports = router;