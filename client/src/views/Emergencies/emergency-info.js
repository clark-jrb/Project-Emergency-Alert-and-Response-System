import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestInfoContext } from '../../context/RequestInfoContext'
import { useRequestContext } from '../../context/RequestContext'

const Emergency_info = () => {
    const requests = useRequestContext()
    const { requestID } = useRequestInfoContext()

    useEffect(() => {
        console.log(requestID)
    }, [requestID])

    return (
        <div className='emergency-info p-3'>
            {requests.filter(request => request.id === requestID).map(request => (
            <div key={request.id}>
                {/* Header  */}
                <div className='emer-title d-flex px-3 py-2'>
                    <div className='forEmer-title'>
                        <p className='m-0 fs-5'>Emergency</p>
                    </div>
                    <div className='forDescriptionLvl d-flex'>
                        <div className='forAlert'>
                            <p className='m-0'>Alert</p>
                            <p className='m-0 px-2 fs-5 fw-bold'>{request.emergency_description}</p>
                        </div>
                        <div className='forLevel'>
                            <p className='m-0'>Level</p>
                            <p className='m-0 px-2 fs-5 fw-bold'>{request.emergency_level}</p>
                        </div>
                    </div>
                </div>
                {/* Content */}
                <div className='emer-container my-3' key={request.id}>
                    <div className='info-left px-3'>

                        <div className='section-1'>
                            <div className='date-time'>
                                <p className='m-0 highlight'><i className="fa-solid fa-calendar-day"></i> Date:</p>
                                <p className='m-0 py-2 highlight'><i className="fa-regular fa-clock"></i> Time:</p>
                            </div>
                        </div>
                            
                        <div className='section-2'>
                            <div className='emer-type'>
                                <p className='m-0 pt-3 highlight'><i className="fa-solid fa-notes-medical"></i> Emergency Type:</p>
                                <p className='m-0 py-2 data'>{request.emergency_type}</p>
                            </div>
                        </div>

                        <div className='section-3'>
                            <div className='location'>
                                <p className='m-0 pt-3 highlight'><i className="fa-solid fa-location-arrow"></i> Location:</p>
                                <p className='m-0 py-2 data'>Location</p>
                            </div>
                        </div>

                        <div className='section-buttons d-flex py-3'>
                            <div className='accept-button w-50'>
                                <button className='btn btn-success w-100'>Accept</button>
                            </div>
                            <div className='decline-button w-50'>
                                <button className='btn btn-danger w-100'>Decline</button>
                            </div>
                        </div>

                    </div>
                    <div className='info-right p-3'>

                        <div className='person-info p-2'>
                            <p className='m-0'><i className="fa-regular fa-user"></i> Person Information</p>
                        </div>

                        <div className='name_gender d-flex mt-3 px-2'>
                            <div className='person_name w-50'>
                                <p className='m-0 forLabel'>Name</p>
                                <p className='m-0 py-2'>» Pogi</p>
                            </div>
                            <div className='person_gender w-50 ps-3'>
                                <p className='m-0 forLabel'>Gender</p>
                                <p className='m-0 py-2'>» Male</p>
                            </div>
                        </div>

                        <div className='occup_cont d-flex mt-3 px-2'>
                            <div className='person_occupation w-50'>
                                <p className='m-0 forLabel'>Occupation</p>
                                <p className='m-0 py-2'>» Student</p>
                            </div>
                            <div className='person_contact w-50 ps-3'>
                                <p className='m-0 forLabel'>Contact</p>
                                <p className='m-0 py-2'>» 12345678</p>
                            </div>
                        </div>

                        <div className='email_cont mt-3 px-2'>
                            <div className='person_email'>
                                <p className='m-0 forLabel'>Email</p>
                                <p className='m-0 py-2'>» pogi@pogi.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            ))}
            {/* {requests.filter(request => request.id === requestID).map(request => (
                <div key={request.id}>
                    <h2>{request.id}</h2>
                    <h2>{request.emergency_description}</h2>
                    <h2>{request.emergency_type}</h2>
                    <h2>{request.emergency_level}</h2>
                    <h2>{request.status}</h2>
                </div>
                
            ))} */}
        </div>
    )
}

export default Emergency_info