import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestInfoContext } from '../../context/RequestInfoContext'
import { useActiveContext } from '../../context/ActiveContext'
import TimeAgo from '../../hooks/buttons/TimeAgo'

const Complete = () => {
    const { requests } = useRequestContext()
    const { setID } = useRequestInfoContext()
    const { active, setTheActive } = useActiveContext()

    const handleClick = (component) => {
        setID(component)
        setTheActive(component)
    }

    return (
        <div className='request-complete d-flex py-3'>
            {requests.filter(request => request.status === 'Complete' | request.status === 'Declined').map(request => (
                <div 
                    className={`req-data container d-flex py-2 px-0 ${active === request.id ? 'active' : ''}`} 
                    key={request.id} 
                    onClick={() => handleClick(request.id)}
                >
                    <div className='count'>
                        <p className='m-0'>{request.request_no}</p>
                    </div>

                    <div className='d-flex w-75 ps-3 h-100'>
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
                                    "URG" : request.emergency_level === '4' ? 
                                    "IMM" : "N/A"
                                }
                            </p>
                        </div>

                        <div className='req-information d-flex ps-2'>
                            <div>
                                <p 
                                className={`m-0 ${request.emergency_level === '1' ? 
                                "ri-1" : request.emergency_level === '2' ? 
                                "ri-2" : request.emergency_level === '3' ? 
                                "ri-3" : request.emergency_level === '4' ? 
                                "ri-4" : "N/A"}`} 
                                
                                style={{fontSize: "medium"}}>
                                    {request.emergency_level === '1' ? 
                                        "NON-URGENT" : request.emergency_level === '2' ? 
                                        "SEMI-URGENT" : request.emergency_level === '3' ? 
                                        "URGENT" : request.emergency_level === '4' ? 
                                        "IMMEDIATE" : "N/A"
                                    }
                                </p>
                                <p className='m-0'>: {request.emergency_type}</p>
                            </div>
                        </div>
                    </div>

                    <div className='req-status-con w-25'>
                        <p className={`m-0 req-status complete-status 
                            ${request.status === 'Complete' ? 'complete-status' :
                                request.status === 'Declined' ? 'declined-status' : "N/A"
                            }
                        `}>
                            {request.status === 'Complete' ? 
                                <>
                                    <i className="fa-regular fa-circle-check"></i>
                                    &nbsp;
                                    {request.status}
                                </> 
                                : request.status === 'Declined' ? 
                                <>
                                    <i className="fa-solid fa-xmark"></i>
                                    &nbsp;
                                    {request.status}
                                </> 
                                :
                                'N/A'
                            }
                        </p>
                    </div>

                    <div className='duration'>
                        <p className='m-0'>
                            <TimeAgo date={request.date} time={request.time}></TimeAgo>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default React.memo(Complete)