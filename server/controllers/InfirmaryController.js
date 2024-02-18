const db = require('../config/firebase')

// set responder to the collection name in firestore
const requests = db.collection('alert_infirmary')

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
    updateRequest
}