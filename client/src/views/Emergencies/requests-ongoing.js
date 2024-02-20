import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestInfoContext } from '../../context/RequestInfoContext'
import { useActiveContext } from '../../context/ActiveContext'
import { useAuth } from '../../context/AuthContext'
import { useUsersContext } from '../../context/UsersContext'
import TimeAgo from '../../hooks/buttons/TimeAgo'

const Ongoing = () => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const { requests } = useRequestContext()
    const { setID } = useRequestInfoContext()
    const { active, setTheActive } = useActiveContext()
    let ongoingArray = []

    const findAdmin = admins.find(admin => admin.email === currentUser.email)

    const ongoingRequests = requests.filter(request => request.status === 'Ongoing');

    const maxSlots = findAdmin.available;

    function addToOngoingArray(element) {
        if (ongoingArray.length < maxSlots) {
            ongoingArray.push(element);
            console.log(`Added request: ${element}`);
        } else {
            console.log('Maximum slots reached. Cannot add more request.');
        }
    }
        
    ongoingRequests.forEach(request => addToOngoingArray(request));

    // const ongoingArray = ongoingRequests.slice(0, maxSlots);

    console.log(ongoingArray.length);
    console.log(ongoingArray);

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

                    <div className='ps-3 d-flex w-75'>
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
                        <div className='req-information d-flex'>
                            <div>
                                <p className='m-0'>
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
                        <p className='m-0'><TimeAgo date={request.date} time={request.time}></TimeAgo></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Ongoing