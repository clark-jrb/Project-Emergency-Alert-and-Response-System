import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useOngoingArray } from '../../context/OngoingArray'
import { useRequestInfoContext } from '../../context/RequestInfoContext'
import { useActiveContext } from '../../context/ActiveContext'
import TimeAgo from '../../hooks/buttons/TimeAgo'

const Ongoing = () => {
    const { ongoingArray } = useOngoingArray()
    const { setID } = useRequestInfoContext()
    const { active, setTheActive } = useActiveContext()

    // console.log(ongoingArray);

    const handleClick = (component) => {
        setID(component)
        setTheActive(component)
    }

    return (
        <div className='request-ongoing d-flex py-3'>
            {ongoingArray.map(request => (
                <div 
                    className={`req-data container d-flex py-2 px-0 ${active === request.id ? 'active' : ''}`} 
                    key={request.id} 
                    onClick={() => handleClick(request.id)}
                >
                    <div className='count'>
                        <p className='m-0'>{request.request_no}</p>
                    </div>

                    <div className='ps-3 d-flex w-75 h-100'>
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
                        <div className='req-information d-flex ps-2'>
                            <div>
                                <p className='m-0' style={{fontSize: "medium"}}>
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
                        <p className={`m-0 req-status ongoing-status`}>
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            {/* <br/> */}
                            &nbsp;
                            {request.status}
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

export default React.memo(Ongoing)