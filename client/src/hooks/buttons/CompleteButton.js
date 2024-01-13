import React from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import { useRequestContext } from '../../context/RequestContext'

const CompleteButton = ({ reqID }) => {
    const { reloadRequests } = useRequestContext()
    const { setTheFilter } = useFilterListContext()
    const setStatus = "Complete"

    const setComplete = async () => {
        try {
            // Make an HTTP PUT request to update the user status
            const response = await fetch(`http://localhost:4000/usf/emergencies/${reqID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            // Example updated data for username and email
                body: JSON.stringify({
                    "status": setStatus
                }),
            })

        
            if (response.ok) {
                // navigate('/usf/emergencies')
                reloadRequests()
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
        <div className='ongoing-cont'>
            <div className='status-title'>
                <p className='mb-2'>Is the request completed?</p>
            </div>
            <button className='complete-btn w-100 py-2' onClick={setComplete}>Yes</button>
        </div>
    )
}

export default CompleteButton