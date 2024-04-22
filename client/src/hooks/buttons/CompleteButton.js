import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import moment from 'moment'
import { collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import sendNotification from '../../context/Notification'

const CompleteButton = ({ reqID, adminRoute, adminName, reqType, token }) => {
    const { setTheFilter } = useFilterListContext()
    const setStatus = 'Complete'
    const currentDateTime = moment().format('LLLL')
    const [isLoading, setIsLoading] = useState(false)
    const { sendNotif } = sendNotification()

    const alertsCollection = collection(db, `alert_${adminRoute}`)
    const specReq = doc(alertsCollection, reqID)

    const setComplete = async () => {
        try {
            setIsLoading(true)

            updateDoc(specReq, {
                status: setStatus,
                time_completed: currentDateTime
            })

            const setQueueToOngoing = async () => {
        
                const querySnapshot = await getDocs(query(alertsCollection, where('status', '==', 'Inqueue')))

                if (querySnapshot.docs.length > 0) {
                    const firstDoc = querySnapshot.docs[0]
                    const specReq = doc(alertsCollection, firstDoc.id)
            
                    // Update the document to have status 'Ongoing'
                    await updateDoc(specReq, {
                        status: 'Ongoing'
                    })
            
                    // console.log('First document with status "Inqueue" updated to "Ongoing"')
                } else {
                    // console.log('No document with status "Inqueue" found')
                }
            }

            setQueueToOngoing()
            setTheFilter(setStatus)

            sendNotif({
                title: adminName + ' - ' + reqType,
                body: 'Request complete!',
                token: token
            })
            console.log('Request complete')
        } catch (error) {
            console.error('Error completing request:', error.message)
        }
    }
    
    return (
        <div className='ongoing-cont-status'>
            <div className='status-title'>
                <p className='mb-2'>Is the request completed?</p>
            </div>
            <button 
                className='complete-btn w-100 py-2'
                onClick={setComplete} 
                disabled={isLoading}
            >
                Yes
            </button>
        </div>
    )
}

export default CompleteButton