import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import { useOngoingArray } from '../../context/OngoingArray'
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import sendNotification from '../../context/Notification'

const AcceptButton = ({ reqID, adminRoute, adminName, reqType, token }) => {
    const { maxSlots, ongoingArray } = useOngoingArray()
    const { setTheFilter } = useFilterListContext()
    const setGoing = "Ongoing"
    const setQueue = "Inqueue"
    const [isLoading, setIsLoading] = useState(false)
    const { sendNotif } = sendNotification()

    const alertsCollection = collection(db, `alert_${adminRoute}`) 
    const specReq = doc(alertsCollection, reqID)



    const setOngoing = async () => {
        try {
            setIsLoading(true)

            updateDoc(specReq, {
                status: setGoing
            })
            
            sendNotif({
                title: adminName + ' - ' + reqType,
                body: 'Request accepted! A responder has been dispatched!',
                token: token
            })
            setTheFilter(setGoing)

        } catch (error) {
            console.error('Error updating request:', error.message)
        }
    }

    const setInqueue = async () => {
        try {
            setIsLoading(true)

            updateDoc(specReq, {
                status: setQueue
            })

            sendNotif({
                title: adminName + ' - ' + reqType,
                body: 'Request received! We will be there soon!',
                token: token
            })

            setTheFilter('New')
        } catch (error) {
            console.error('Error queueing request:', error.message)
        }
    }
    
    return (
        <div className='accept-cont w-50'>
            <button 
                className='accept-btn w-100 py-2' 
                onClick={ongoingArray.length === maxSlots ? setInqueue : setOngoing} 
                disabled={isLoading}
            >
                <i className="fa-solid fa-check"/> {isLoading ? 'Accepting...' : 'Accept'}
            </button>
        </div>
    )
}

export default AcceptButton