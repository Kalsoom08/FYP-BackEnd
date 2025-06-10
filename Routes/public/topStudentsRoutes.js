const express = require('express');
const { getTopStudents } = require("../../Controllers/public/topStudentsController.js");

const router = express.Router();

router.get('/top_10_students', getTopStudents);

module.exports = router;

