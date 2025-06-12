const express = require('express');
const { getCampusMap } = require('../../Controllers/public/mapController.js');

const router = express.Router();

router.get('/map', getCampusMap);

module.exports = router;
