const db = require('../config/firebase')
const moment = require('moment')

// set responder to the collection name in firestore
const requests = db.collection('emergency_requests')

// GET ALL REQUEST DATA
const getRequests = (req, res) => {
    try {
        const unsubscribe = requests.onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
        const { timestamp, ...rest } = doc.data()
        const timepoint = timestamp.toDate()

        const dataComponent = moment(timepoint).format('LL')
        const timeComponent = moment(timepoint).format('LT')

        return {
            id: doc.id,
            date: dataComponent,
            time: timeComponent,
            ...rest
        }
        })

        res.json(data)
    })

      // Cleanup the listener when the request is completed
    res.on('finish', () => {
        unsubscribe()
    })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// UPDATE FUNCTION (UPDATE REQUEST STATUS)

async function updateRequest(reqID, updatedData) {
    const specRequest = requests.doc(reqID)
    
    try {
        const requestDoc = await specRequest.get()
    
        if (!requestDoc.exists) {
            throw new Error('Request not found')
        }
    
        await specRequest.update({
            ...updatedData
        })
    
        return 'Request updated successfully'
    } catch (error) {
        console.error('Error updating request:', error.message)
        throw error
    }
}

module.exports = {
    getRequests,
    updateRequest,
}