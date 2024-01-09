const db = require('../config/firebase')
const moment = require('moment')

// set responder to the collection name in firestore
const requests = db.collection('emergency_requests')

const getRequests = async (req, res) => {
    try {
        // const snapshot = await requests.get()
        // const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const snapshot = await requests.get()
        const data = snapshot.docs.map(doc => {
            const { timestamp, ...rest } = doc.data()
            const timepoint = timestamp.toDate() // Convert Firestore timepoint to JavaScript Date object

            // Extract data and time components
            const dataComponent = moment(timepoint).format('LL'); // Format: YYYY-MM-DD
            const timeComponent = moment(timepoint).format('LT'); // Format: HH:mm:ss

            return {
                id: doc.id,
                date: dataComponent,
                time: timeComponent,
                ...rest
            }
        })

        res.json(data)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getRequests,
}