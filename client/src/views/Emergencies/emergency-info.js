import React from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useUsersContext } from '../../context/UsersContext'
import { useActiveContext } from '../../context/ActiveContext'
import { useAuth } from '../../context/AuthContext'
import { ReactComponent as SecuritySVG } from '../../images/icons/security.svg'
import { ReactComponent as AssistSVG } from '../../images/icons/assistance.svg'
import { ReactComponent as ViolenceSVG } from '../../images/icons/violence.svg'
import { ReactComponent as AccidentSVG } from '../../images/icons/accident.svg'

import DeclineButton from '../../hooks/buttons/DeclineButton'
import CompleteButton from '../../hooks/buttons/CompleteButton'
import AcceptButton from '../../hooks/buttons/AcceptButton'

const Emergency_info = () => {
    const { currentUser } = useAuth()
    const { requests } = useRequestContext()
    const { users, admins } = useUsersContext()
    const { active, setTheActive } = useActiveContext()

    const specificReq = requests.find(request => request.id === active)

    // for Route
    const findAdmin = admins.find(admin => admin.email === currentUser.email)

    const handleCloseBtn = (e) => {
        setTheActive(e)
    }

    return (
        // Emergency Information 
        <div className='emergency-info p-4'>
            {specificReq && (
                <div key={specificReq.id} className='h-100'>

                    {/* Header  */}
                    <div className='d-flex emer-header-cont'>
                        <div className='forEmer-title px-3 py-2'>
                            <p className='m-0 fs-5 fw-bold'>Emergency # {specificReq.request_no}</p>
                        </div>
                        <div className={`emer-title d-flex px-3 py-2 ${specificReq.emergency_level === '1' ? 
                                        "blue" : specificReq.emergency_level === '2' ? 
                                        "green" : specificReq.emergency_level === '3' ? 
                                        "yellow" : specificReq.emergency_level === '4' ? 
                                        "red" : ""}`}>
                            
                            <div className='forDescriptionLvl d-flex'>
                                <div className='forLevel'>
                                    <p className='m-0'>Level »</p>
                                    <p className='m-0 px-2 fs-5 fw-bold'>{specificReq.emergency_level}</p>
                                </div>
                                <div className='forAlert'>
                                    <p className='m-0'>Alert »</p>
                                    <p className={`alertHighlight m-0 px-2 fs-5 fw-bold ${specificReq.emergency_level === '1' ? 
                                        "blue" : specificReq.emergency_level === '2' ? 
                                        "green" : specificReq.emergency_level === '3' ? 
                                        "yellow" : specificReq.emergency_level === '4' ? 
                                        "red" : ""}`}
                                    >
                                        {specificReq.emergency_level === '1' ? 
                                        "NON-URGENT" : specificReq.emergency_level === '2' ? 
                                        "SEMI-URGENT" : specificReq.emergency_level === '3' ? 
                                        "URGENT" : specificReq.emergency_level === '4' ? 
                                        "IMMEDIATE" : "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className='close-request-btn' onClick={() => handleCloseBtn(null)}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    

                    {/* Content */}
                    <div className='emer-container' key={specificReq.id}>

                        {/* Info-left */}
                        <div className='info-left px-3 mt-3'>
                            {/* Date & Time with Emergency Type Icon Section */}
                            <div className='section-1 d-flex'>
                                <div className='date-time w-50'>

                                    <p className='m-0 highlight'><i className="fa-solid fa-calendar-day"></i> Date: </p>
                                    <span style={{fontSize: "large", textAlign: "center"}}>
                                        <p className="pb-3" style={{borderBottom: "1px solid #ccc"}}>» {specificReq.date}</p>
                                    </span>

                                    <p className='m-0 highlight'><i className="fa-regular fa-clock"></i> Time: </p>
                                    <span style={{fontSize: "large", textAlign: "center"}}>
                                        <p>» {moment(specificReq.timestamp).format('LT')}</p>
                                    </span>

                                </div>
                                <div className='emertype-icon-con w-50 pb-4'>
                                    <div className={`emertype-icon h-100 w-50 d-flex ${specificReq.emergency_level === '1' ? 
                                    "blue" : specificReq.emergency_level === '2' ? 
                                    "green" : specificReq.emergency_level === '3' ? 
                                    "yellow" : specificReq.emergency_level === '4' ? 
                                    "red" : ""}`}>

                                        {specificReq.emergency_type === 'Security' 
                                            ? 
                                                <SecuritySVG className={`security-icon ${specificReq.emergency_level === '1' ? 
                                                "blue" : specificReq.emergency_level === '2' ? 
                                                "green" : specificReq.emergency_level === '3' ? 
                                                "yellow" : specificReq.emergency_level === '4' ? 
                                                "red" : ""}`} height="65" width="65"></SecuritySVG> : specificReq.emergency_type === 'Accident' 
                                            ? 
                                                <AccidentSVG className={`accident-icon ${specificReq.emergency_level === '1' ? 
                                                "blue" : specificReq.emergency_level === '2' ? 
                                                "green" : specificReq.emergency_level === '3' ? 
                                                "yellow" : specificReq.emergency_level === '4' ? 
                                                "red" : ""}`} height="65" width="65"></AccidentSVG> : specificReq.emergency_type === 'Assistance' 
                                            ? 
                                                <AssistSVG className={`assist-icon ${specificReq.emergency_level === '1' ? 
                                                "blue" : specificReq.emergency_level === '2' ? 
                                                "green" : specificReq.emergency_level === '3' ? 
                                                "yellow" : specificReq.emergency_level === '4' ? 
                                                "red" : ""}`} height="65" width="65"></AssistSVG> : specificReq.emergency_type === 'Violence' 
                                            ? 
                                                <ViolenceSVG className={`violence-icon ${specificReq.emergency_level === '1' ? 
                                                "blue" : specificReq.emergency_level === '2' ? 
                                                "green" : specificReq.emergency_level === '3' ? 
                                                "yellow" : specificReq.emergency_level === '4' ? 
                                                "red" : ""}`} height="65" width="65"></ViolenceSVG> : 'N/A'
                                        }

                                    </div>
                                </div>
                            </div>
                            {/* Emergency Type Section */}
                            <div className='section-2'>
                                <div className='emer-type'>
                                    <p className='m-0 pt-3 highlight'><i className="fa-solid fa-notes-medical"></i> Emergency Type:</p>
                                    <p className='m-0 py-2 data fs-5'>{specificReq.emergency_type}</p>
                                </div>
                            </div>
                            {/* Location Section */}
                            <div className='section-3'>
                                <div className='location'>
                                    <p className='m-0 pt-3 highlight'><i className="fa-solid fa-location-arrow"></i> Location:</p>
                                    <p className='m-0 py-2 data fs-5'>Location</p>
                                </div>
                            </div>
                            {/* Buttons Section */}
                            <div className="section-buttons d-flex py-3">
                                {specificReq.status === 'New' && (
                                    <div className="w-100">
                                        <div className="status-title">
                                            <p className="mb-2">Are you ready to take action?</p>
                                        </div>
                                        <div className="d-flex w-100 gap-3">
                                            <AcceptButton reqID={specificReq.id} adminRoute={findAdmin.route}/>
                                            <DeclineButton />
                                        </div>
                                    </div>
                                )}
                                {specificReq.status === 'Ongoing' && (
                                    <CompleteButton reqID={specificReq.id} adminRoute={findAdmin.route}/>
                                )}
                                {specificReq.status === 'Inqueue' && (
                                    <div className="w-100">
                                        <p className="m-0">In Queue</p>
                                    </div>
                                )}
                                {specificReq.status === 'Complete' && (
                                    <div className="completed-cont">
                                        <div className="status-title">
                                            <p className="mb-2">Status:</p>
                                        </div>
                                        <div className="completed-bar py-2">
                                            <p className="m-0">Completed <i className="fa-regular fa-circle-check"></i></p>
                                        </div>
                                        <div className="status-complete py-2">
                                            <p>Completed at » {specificReq.time_completed}</p>
                                        </div>
                                    </div>
                                )}
                                {['New', 'Ongoing', 'Complete'].indexOf(specificReq.status) === -1 && 'N/A'}
                            </div>
                        </div>

                        {/* Info-right */}
                            {users.filter(user => user.id === specificReq.userID ).map(user => (
                                <div className='info-right p-3 mt-3' key={user.id}>

                                    <div className='person-info py-2 px-3'>
                                        <p className='m-0'><i className="fa-regular fa-user"></i> Person Information</p>
                                    </div>

                                    <div className='name_gender d-flex mt-3 px-2'>
                                        <div className='person_name w-50'>
                                            <p className='m-0 forLabel'>Name</p>
                                            <p className='m-0 py-2'>» {user.fullname}</p>
                                        </div>
                                        <div className='person_gender w-50 ps-3'>
                                            <p className='m-0 forLabel'>Gender</p>
                                            <p className='m-0 py-2'>» {user.gender}</p>
                                        </div>
                                    </div>

                                    <div className='occup_cont d-flex mt-3 px-2'>
                                        <div className='person_occupation w-50'>
                                            <p className='m-0 forLabel'>Occupation</p>
                                            <p className='m-0 py-2'>» {user.occupation}</p>
                                        </div>
                                        <div className='person_contact w-50 ps-3'>
                                            <p className='m-0 forLabel'>Contact</p>
                                            <p className='m-0 py-2'>» {user.contact}</p>
                                        </div>
                                    </div>

                                    <div className='email_cont mt-3 px-2'>
                                        <div className='person_email'>
                                            <p className='m-0 forLabel'>Email</p>
                                            <p className='m-0 py-2'>» {user.email}</p>
                                        </div>
                                    </div>

                                    <div className='button_cont mt-3 px-2 py-3'>
                                        <div className='call_message d-flex'>
                                            <button className='call-btn py-2'><i className="fa-regular fa-message"></i> Message</button>
                                            <div className='forOr d-flex'>
                                                <p className='m-0'>or</p>
                                            </div>
                                            <button className='chat-btn py-2'><i className="fa-solid fa-phone"></i> Call</button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Emergency_info