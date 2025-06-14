const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const { uploadTimeTable,
        updateTimeTable, 
        deleteTimeTable,
        getTimeTableById,
        getAllTimeTables } = require('../../Controllers/admin/timeTableController.js');
const  verify  = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const router = express.Router();

router.post('/timetable', verify, restrictTo('admin'), upload.single('file'), uploadTimeTable);
router.get('/timetable', verify, restrictTo('admin'), upload.single('file'), getAllTimeTables );
router.get('/timetable/:id', verify, restrictTo('admin'), upload.single('file'), getTimeTableById);
router.put('/timetable/:id', verify, restrictTo('admin'), upload.single('file'), updateTimeTable);
router.delete('/timetable/:id', verify, restrictTo('admin'), upload.single('file'), deleteTimeTable);

module.exports = router;
