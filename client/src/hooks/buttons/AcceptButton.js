import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import { useOngoingArray } from '../../context/OngoingArray'
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const AcceptButton = ({ reqID, adminRoute }) => {
    const { maxSlots, ongoingArray } = useOngoingArray()
    const { setTheFilter } = useFilterListContext()
    const setGoing = "Ongoing"
    const setQueue = "Inqueue"
    const [isLoading, setIsLoading] = useState(false)

    const alertsCollection = collection(db, `alert_${adminRoute}`) 
    const specReq = doc(alertsCollection, reqID)

    const setOngoing = async () => {
        try {
            setIsLoading(true)

            updateDoc(specReq, {
                status: setGoing
            })
            
            const response = await fetch('http://localhost:4000/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'USF test',
                    body: 'Request Accepted! A responder has been dispatched',
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to send notification to server');
            }
            console.log('Notification sent to server successfully');

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