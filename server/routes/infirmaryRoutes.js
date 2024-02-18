const express = require('express')
const router = express.Router()
const { updateRequest } = require('../controllers/infirmaryController')

router.get('/')

router.get('/emergencies', (req, res) => {
    res.json({ message: 'This is for infirmary' })
})

router.put('/emergencies/:reqID', async (req, res) => {
    const reqID = req.params.reqID
    const updatedData = req.body
    
    try {
        const result = await updateRequest(reqID, updatedData)
        
        res.json({ message: result })
        console.log('request updated')
    } catch (error) {
        res.status(500).json({ error: error.message })

        console.log(error)
    }
})

module.exports = router