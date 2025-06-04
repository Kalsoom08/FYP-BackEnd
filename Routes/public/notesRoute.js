const express = require('express');
const router = express.Router();
const getNotes = require('../../Controllers/public/notesController');

router.get('/notes', getNotes)

module.exports = router
