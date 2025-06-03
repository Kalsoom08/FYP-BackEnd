const express = require('express');
const router = express.Router();
const getNotifications = require('../../Controllers/public/notificationsController') ;

router.get('/notification', getNotifications);
module.exports = router;