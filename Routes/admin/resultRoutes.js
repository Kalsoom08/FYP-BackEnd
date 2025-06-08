const express = require('express');
const upload = require('../../Middleware/cloudinary.js');
const verify = require('../../Middleware/verifyAdminMiddleware.js');
const restricTo = require('../../Middleware/restrictToMiddleware.js');
const { uploadResultFromXlsx,
        getAllResults,
        getResultById,
        updateResultById,
        deleteResultById,
        deleteResultByQuery } = require('../../Controllers/admin/resultController.js');
const router = express.Router();

router.post('/results/upload-xlsx',verify, restricTo('admin'), upload.single('file'), uploadResultFromXlsx);
router.get('/results', verify, restricTo('admin'), getAllResults);
router.get('/results/:id', verify, restricTo('admin'), getResultById);
router.put('/results/:id', verify, restricTo('admin'), updateResultById);
router.delete('/results/:id', verify, restricTo('admin'), deleteResultById);
router.delete('/results', verify, restricTo('admin'), deleteResultByQuery);

module.exports = router;