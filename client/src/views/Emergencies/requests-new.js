import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'

const New = () => {
    const requests = useRequestContext()

    return (
        <div className='request-new d-flex pt-3'>
            {requests.filter(request => request.status === 'New').map(request => (
                <div className='req-data container border d-flex py-2 px-0' key={request.id}>
                    <div className='count d-flex'>
                        <p className='m-0'>1</p>
                    </div>
                    <div className='level-logo d-flex'>
                        <p className='m-0'>L1</p>
                    </div>
                    <div className='req-information'>
                        <p className='m-0'>{request.emergency_description}</p>
                        <p className='m-0'>: {request.emergency_type}</p>
                    </div>
                    <div className='duration d-flex'>
                        <p className='m-0'>1h</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default New