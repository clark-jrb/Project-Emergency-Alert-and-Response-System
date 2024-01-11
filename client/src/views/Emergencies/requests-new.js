import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestInfoContext } from '../../context/RequestInfoContext'
import { useActiveContext } from '../../context/ActiveContext'

const New = () => {
    const requests = useRequestContext()
    const { setID } = useRequestInfoContext()
    const { active, setTheActive } = useActiveContext()

    const handleClick = (component) => {
        setID(component)
        setTheActive(component)
    }

    return (
        <div className='request-new d-flex pt-3'>
            {requests.filter(request => request.status === 'New').map(request => (
                <div 
                    className={`req-data container d-flex py-2 px-0 ${active === request.id ? 'active' : ''}`} 
                    key={request.id} 
                    onClick={() => handleClick(request.id)}
                >
                    <div className='count d-flex'>
                        <p className='m-0'>{request.req_no}</p>
                    </div>
                    <div className={`level-logo d-flex 
                        ${request.emergency_level === '1' ? 
                            "blue" : request.emergency_level === '2' ? 
                            "green" : request.emergency_level === '3' ? 
                            "yellow" : request.emergency_level === '4' ? 
                            "red" : "N/A"
                        }
                        `}>
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

export default New