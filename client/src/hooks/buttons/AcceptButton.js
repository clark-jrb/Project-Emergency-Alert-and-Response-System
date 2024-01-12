import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFilterListContext } from '../../context/FilterListContext'
import { useRequestContext } from '../../context/RequestContext'

const AcceptButton = ({ reqID }) => {
    const { reloadRequests } = useRequestContext()
    const navigate = useNavigate()
    const { setTheFilter } = useFilterListContext()
    const setStatus = "Ongoing"

    const setOngoing = async () => {
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
            navigate('/usf/emergencies')
            reloadRequests()
            setTheFilter(setStatus)
            
            console.log('Request updated successfully')
        } else {
            console.error('Failed to update request:', response.statusText)
        }
    } catch (error) {
        console.error('Error updating request:', error.message)
    }
    }
    
    return (
        <div className='accept-cont w-50'>
            <button className='accept-btn w-100 py-2' onClick={setOngoing}>Accept</button>
        </div>
    )
}

export default AcceptButton