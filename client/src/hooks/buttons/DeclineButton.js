import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import sendNotification from '../../context/Notification'

const DeclineButton = ({ reqID, adminRoute, adminName, reqType, token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { setTheFilter } = useFilterListContext()
    const setDecline = 'Declined'
    const { sendNotif } = sendNotification()

    const alertsCollection = collection(db, `alert_${adminRoute}`) 
    const specReq = doc(alertsCollection, reqID)

    const setDeclined = async () => {
        try {
            setIsLoading(true)

            updateDoc(specReq, {
                status: setDecline
            })
            
            sendNotif({
                title: adminName + ' - ' + reqType,
                body: 'Request declined',
                token: token
            })
            setTheFilter('Complete')

        } catch (error) {
            console.error('Error updating request:', error.message)
        }
    }

    return (
        <div className='decline-cont w-50'>
            <button 
                className='decline-btn w-100 py-2'
                onClick={setDeclined} 
                disabled={isLoading}
            >
                <i className="fa-solid fa-xmark"></i> Decline
            </button>
        </div>
    )
}

export default DeclineButton