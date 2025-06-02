const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const { uploadTimeTable } = require('../../Controllers/admin/timeTableController.js');
const router = express.Router();

router.post('/admin/timetable', upload.single('file'), uploadTimeTable);

module.exports = router;
