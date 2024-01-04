const express = require('express')
const router = express.Router()
const { getRequests } = require('../controllers/usfController')

router.get('/')

router.get('/emergencies', getRequests)

module.exports = router