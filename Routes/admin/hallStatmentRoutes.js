const express = require('express')
const {  uploadHallStatement,
         getAllHallStatements, 
         getHallStatementById, 
         updateHallStatement, 
         deleteHallStatement } = require('../../Controllers/admin/hallStatmentController.js');
const upload = require('../../Middleware/cloudinary.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restrictTo = require('../../Middleware/restrictToMiddleware.js');

const router = express.Router();

router.post('/hall_statment', verify, restrictTo('admin'), upload.single('file'), uploadHallStatement);
router.get('/hall_statment', verify, restrictTo('admin'), upload.single('file'), getAllHallStatements);
router.get('/hall_statment/:id', verify, restrictTo('admin'), upload.single('file'), getHallStatementById);
router.put('/hall_statment/:id', verify, restrictTo('admin'), upload.single('file'), updateHallStatement);
router.delete('/hall_statment/:id', verify, restrictTo('admin'), upload.single('file'), deleteHallStatement);

module.exports = router;