const express = require('express');
const { getRenewalSlip } = require('../../Controllers/public/renewalSlipController.js');

const router = express.Router();

router.get('/renewal/slip', getRenewalSlip);

module.exports = router;