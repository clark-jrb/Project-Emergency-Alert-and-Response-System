import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestInfoContext } from '../../context/RequestInfoContext'

const Complete = () => {
    const requests = useRequestContext()
    const { requestID, setID } = useRequestInfoContext()
    const [selectedComponent, setSelectedComponent] = useState(null)

    const handleClick = (component) => {
        setID(component)
        setSelectedComponent(component)
    }

    return (
        <div className='request-complete d-flex pt-3'>
            {requests.filter(request => request.status === 'Complete').map(request => (
                <div 
                    className={`req-data container border d-flex py-2 px-0 ${selectedComponent === request.id ? 'active' : ''}`} 
                    key={request.id} 
                    onClick={() => handleClick(request.id)}
                >
                    <div className='count d-flex'>
                        <p className='m-0'>1</p>
                    </div>
                    <div className={`level-logo d-flex
                        ${request.emergency_level === '1' ? 
                            "blue" : request.emergency_level === '2' ? 
                            "green" : request.emergency_level === '3' ? 
                            "yellow" : request.emergency_level === '4' ? 
                            "red" : "N/A"
                        }`}>
                        <p className='m-0'>
                            {request.emergency_level === '1' ? 
                                "L1" : request.emergency_level === '2' ? 
                                "L2" : request.emergency_level === '3' ? 
                                "L3" : request.emergency_level === '4' ? 
                                "L4" : "N/A"
                            }
                        </p>
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

export default Complete