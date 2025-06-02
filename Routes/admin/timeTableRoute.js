const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const { uploadTimeTable, updateTimeTable } = require('../../Controllers/admin/timeTableController.js');
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const router = express.Router();

router.post('/admin/timetable', verify, restrictTo('admin'), upload.single('file'), uploadTimeTable);
router.put('/admin/timetable/:id', verify, restrictTo('admin'), upload.single('file'), updateTimeTable);

module.exports = router;
