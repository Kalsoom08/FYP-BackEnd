const express = require('express');
const { getHallStatement } = require('../../Controllers/public/hallStatmentController.js');
const router = express.Router();

router.get('/hall_statment', getHallStatement);

module.exports = router;