const db = require('../config/firebase')

// set responder to the collection name in firestore
const requests = db.collection('emergency_requests')

const getRequests = async (req, res) => {
    try {
        const snapshot = await requests.get()
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        res.json(data)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getRequests,
}