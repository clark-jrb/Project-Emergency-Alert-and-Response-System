import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestInfoContext } from '../../context/RequestInfoContext'
import { useRequestContext } from '../../context/RequestContext'

const Emergency_info = () => {
    const requests = useRequestContext()
    const { requestID } = useRequestInfoContext()

    // useEffect(() => {
    //     console.log(requestID)
    // }, [requestID])

    return (
        <div className='emergency-info'>
            {requests.filter(request => request.id === requestID).map(request => (
                <div key={request.id}>
                    <h2>{request.id}</h2>
                    <h2>{request.emergency_description}</h2>
                    <h2>{request.emergency_type}</h2>
                    <h2>{request.emergency_level}</h2>
                    <h2>{request.status}</h2>
                </div>
                
            ))}
        </div>
    )
}

export default Emergency_info