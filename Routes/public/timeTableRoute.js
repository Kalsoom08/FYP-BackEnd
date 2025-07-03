const express = require('express');
const { getTimeTable, getTimetableOptions } = require('../../Controllers/public/timeTableController.js');

const router = express.Router();

router.get('/timetable', getTimeTable);
router.get('/timetable/options', getTimetableOptions);
module.exports = router;