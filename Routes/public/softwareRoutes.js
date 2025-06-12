const express = require('express')
const router = express.Router()
const {getAllSoftwares, getSoftwareByName} = require('../../Controllers/public/softwaresController')

router.get('/software', getAllSoftwares)
router.get('/software/name/:name', getSoftwareByName)

module.exports = router