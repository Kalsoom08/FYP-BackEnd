const express = require('express');
const { getDatesheet } = require('../../Controllers/public/datesheetController.js');

const router = express.Router();

router.get('/datesheet', getDatesheet);
module.exports = router;