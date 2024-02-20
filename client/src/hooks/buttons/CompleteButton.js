import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import { useAuth } from '../../context/AuthContext'
import { useUsersContext } from '../../context/UsersContext'
// import { useRequestContext } from '../../context/RequestContext'
import moment from 'moment'
import { collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const CompleteButton = ({ reqID, adminRoute }) => {
    // const { reloadRequests } = useRequestContext()
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const { setTheFilter } = useFilterListContext()
    const setStatus = "Complete"
    const currentDateTime = moment().format('LLLL');
    const [isLoading, setIsLoading] = useState(false);
    
    const findAdmin = admins.find(admin => admin.email === currentUser.email)

    const setComplete = async () => {
        try {
            setIsLoading(true)
            // Make an HTTP PUT request to update the user status
            const response = await fetch(`http://localhost:4000/${adminRoute}/emergencies/${reqID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            // Example updated data for username and email
                body: JSON.stringify({
                    "status": setStatus,
                    "time_completed": currentDateTime
                }),
            })

            const setQueueToOngoing = async () => {
                const requestCollection = collection(db, `alert_${findAdmin.route}`)
        
                const querySnapshot = await getDocs(query(requestCollection, where("status", "==", "Inqueue")));

                if (querySnapshot.docs.length > 0) {
                    const firstDoc = querySnapshot.docs[0];
                    const specReq = doc(requestCollection, firstDoc.id);
            
                    // Update the document to have status 'Ongoing'
                    await updateDoc(specReq, {
                        status: 'Ongoing'
                    });
            
                    // Uncomment the line below if you want to log the result
                    console.log('First document with status "Inqueue" updated to "Ongoing"');
                } else {
                    // Uncomment the line below if you want to log the result
                    console.log('No document with status "Inqueue" found');
                }
            }

        
            if (response.ok) {
                // navigate('/usf/emergencies')
                // reloadRequests()
                    setQueueToOngoing()
                    setTheFilter(setStatus)
                    console.log('Request complete')
            } else {
                console.error('Failed to complete request:', response.statusText)
            }
        } catch (error) {
            console.error('Error completing request:', error.message)
        }
    }
    
    return (
        <div className='ongoing-cont-status'>
            <div className='status-title'>
                <p className='mb-2'>Is the request completed?</p>
            </div>
            <button className='complete-btn w-100 py-2' onClick={setComplete} disabled={isLoading}>
                Yes
            </button>
        </div>
    )
}

export default CompleteButton