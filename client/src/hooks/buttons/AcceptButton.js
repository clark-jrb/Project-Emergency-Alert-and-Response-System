import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
// import { useRequestContext } from '../../context/RequestContext'

const AcceptButton = ({ reqID, adminRoute }) => {
    // const { reloadRequests } = useRequestContext()
    const { setTheFilter } = useFilterListContext()
    const setStatus = "Ongoing"
    const [isLoading, setIsLoading] = useState(false);

    const setOngoing = async () => {
        try {
            // Make an HTTP PUT request to update the user status
            setIsLoading(true)

            // setTimeout(async () => {
                // Make an HTTP PUT request to update the user status
                const response = await fetch(`http://localhost:4000/${adminRoute}/emergencies/${reqID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Example updated data for username and email
                    body: JSON.stringify({
                        "status": setStatus
                    }),
                });

                
    
                if (response.ok) {
                    // reloadRequests()
                    setTheFilter(setStatus);                    
                    console.log('Request updated successfully');
                } else {
                    console.error('Failed to update request:', response.statusText);
                }
            // }, 2000);
        } catch (error) {
            console.error('Error updating request:', error.message)
        }
    }
    
    return (
        <div className='accept-cont w-50'>
            <button className='accept-btn w-100 py-2' onClick={setOngoing} disabled={isLoading}>
                <i className="fa-solid fa-check"></i> {isLoading ? 'Accepting...' : 'Accept'}
            </button>
        </div>
    )
}

export default AcceptButton