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

// UPDATE FUNCTION (UPDATE REQUEST STATUS)

async function updateRequest(reqID, updatedData) {
    const specRequest = requests.doc(reqID);
    
    try {
        const requestDoc = await specRequest.get();
    
        if (!requestDoc.exists) {
            throw new Error('Request not found');
        }
    
        await specRequest.update({
            ...updatedData
        });
    
        return 'Request updated successfully';
    } catch (error) {
        console.error('Error updating request:', error.message);
        throw error;
    }
}

module.exports = {
    getRequests,
    updateRequest,
}