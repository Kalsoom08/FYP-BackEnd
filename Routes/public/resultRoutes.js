const express = require('express');
const { searchResult } = require('../../Controllers/public/resultController.js');
const router = express.Router();

router.post('/results/search', searchResult);

module.exports = router;