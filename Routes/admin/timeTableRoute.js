const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const { uploadTimeTable, updateTimeTable } = require('../../Controllers/admin/timeTableController.js');
const router = express.Router();

router.post('/admin/timetable', upload.single('file'), uploadTimeTable);
router.put('/admin/timetable/:id', upload.single('file'), updateTimeTable);

module.exports = router;
