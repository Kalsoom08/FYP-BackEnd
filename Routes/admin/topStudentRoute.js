const express = require('express');
const {  uploadTop10Students,
         deleteTopStudentPdf,
         getTopStudents,
         updateTopStudentPdf } = require('../../Controllers/admin/topStudentController.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');
const upload = require('../../Middleware/cloudinary.js');

const router = express.Router();

router.post('/top_10_students', verify, restrictTo('admin'), upload.single('file'), uploadTop10Students);
router.get('/top_10_students', verify, restrictTo('admin'), upload.single('file'), getTopStudents);
router.put('/top_10_students/:id', verify, restrictTo('admin'), upload.single('file'), updateTopStudentPdf);
router.delete('/top_10_students/:id', verify, restrictTo('admin'), upload.single('file'), deleteTopStudentPdf);

module.exports = router;