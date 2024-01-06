import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestInfoContext } from '../../context/RequestInfoContext'

const Ongoing = () => {
    const requests = useRequestContext()
    const { requestID, setID } = useRequestInfoContext()

    const handleClick = (component) => {
        setID(component)
    }

    // useEffect(() => {
    //     console.log(requestID)
    // }, [requestID])

    return (
        <div className='request-ongoing d-flex pt-3'>
            {requests.filter(request => request.status === 'Ongoing').map(request => (
                <div className='req-data container border d-flex py-2 px-0' key={request.id} onClick={() => handleClick(request.id)}>
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

export default Ongoing