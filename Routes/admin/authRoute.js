const express = require('express');
const router = express.Router();
const { LoginAdmin } = require('../../Controllers/admin/authController');

router.post('/login', LoginAdmin);

module.exports = router;
