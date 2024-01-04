const express = require('express')
const router = express.Router()

router.get('/')

router.get('/emergencies', (req, res) => {
    res.json({ message: 'This is for infirmary' })
})

module.exports = router