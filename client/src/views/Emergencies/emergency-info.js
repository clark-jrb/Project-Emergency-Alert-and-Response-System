import React, { useEffect } from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useActiveContext } from '../../context/ActiveContext'
import { useUsersContext } from '../../context/UsersContext'
import { useLocateContext } from '../../context/LocateContext'
import { useMessageContext } from '../../context/MessagesContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import abdominal from '../../images/icons/i_abdominal.png'
import earthquake from '../../images/icons/i_earthquake.png'
import harassment from '../../images/icons/i_harassment.png'
import allergies from '../../images/icons/i_allergies.png'
import bleeding from '../../images/icons/i_bleeding.png'
import breathing from '../../images/icons/i_breathing.png'
import escort from '../../images/icons/i_escort.png'
import faint from '../../images/icons/i_faint.png'
import fire from '../../images/icons/i_fire.png'
import injury from '../../images/icons/i_injury.png'
import roadaccident from '../../images/icons/i_roadaccident.png'
import seizure from '../../images/icons/i_seizure.png'
import suscpicious from '../../images/icons/i_suscpicious.png'
import theft from '../../images/icons/i_theft.png'
import violence from '../../images/icons/i_violence.png'
import infirmary_others from '../../images/icons/ic_infirmary_others.png'
// import DeclineButton from '../../hooks/buttons/DeclineButton'
import CompleteButton from '../../hooks/buttons/CompleteButton'
import AcceptButton from '../../hooks/buttons/AcceptButton'

const Emergency_info = () => {
    const { currentUserRole } = useAuth()
    const { requests } = useRequestContext()
    const { users, admins } = useUsersContext()
    const { active, setTheActive } = useActiveContext()
    const { setLocation } = useLocateContext()
    const navigate = useNavigate()

    const { setTheMessageActive } = useMessageContext()
    const { setTheActiveUser } = useActiveContext()


    const specificReq = requests.find(request => request.id === active)
    const specificUserReq = users.find(user => specificReq.userID === user.id)

    // useEffect(() => {
    //     console.log(specificReq);
    // }, [specificReq]);

    // for Route
    const findAdmin = admins.find(admin => admin.route === currentUserRole)

    const handleCloseBtn = (e) => {
        setTheActive(e)
    }

    const handleLocateBtn = (e) => {
        setLocation(e)
        navigate(`/${findAdmin.route}/map`)
    }

    const handleMessage = () => {
        setTheMessageActive(specificUserReq.id + "_" + findAdmin.id)
        setTheActiveUser(specificUserReq.id)
        navigate(`/${findAdmin.route}/messages`)
    }

    // useEffect(() => {
    //     console.log(specificUserReq.id + "_" + findAdmin.id);
    // }, [specificUserReq.id, findAdmin.id]);
    
    return (
        // Emergency Information 
        specificReq && (
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
                            <div className='emertype-icon-con w-50 px-3'>
                                <div className={`emertype-icon p-3 d-flex ${specificReq.emergency_level === '1' ? 
                                "blue" : specificReq.emergency_level === '2' ? 
                                "green" : specificReq.emergency_level === '3' ? 
                                "yellow" : specificReq.emergency_level === '4' ? 
                                "red" : ""}`}>

                                    {specificReq.emergency_type === 'Earthquake' ? 
                                        <img src={earthquake} alt="earthquake"/>
                                        : specificReq.emergency_type === 'Bullying_Harassment' ? 
                                        <img src={harassment} alt="harassment" />
                                        : specificReq.emergency_type === 'Seizure' ? 
                                        <img src={seizure} alt="seizure" />
                                        : specificReq.emergency_type === 'Difficulty Breathing' ? 
                                        <img src={breathing} alt="breathing" />
                                        : specificReq.emergency_type === 'Physical Injury' ?
                                        <img src={injury} alt="injury" />
                                        : specificReq.emergency_type === 'Abdominal Pain' ? 
                                        <img src={abdominal} alt="abdominal" />
                                        : specificReq.emergency_type === 'Allergies_Anaphylaxis' ? 
                                        <img src={allergies} alt="allergies" />
                                        : specificReq.emergency_type === 'Fainting' ? 
                                        <img src={faint} alt="faint" />
                                        : specificReq.emergency_type === 'Bleeding' ? 
                                        <img src={bleeding} alt="bleeding" />
                                        : specificReq.emergency_type === 'Others' ? 
                                        <img src={infirmary_others} alt="infirmary_others" />
                                        : specificReq.emergency_type === 'Violence' ? 
                                        <img src={violence} alt="violence" />
                                        : specificReq.emergency_type === 'Fire Hazard' ? 
                                        <img src={fire} alt="fire" />
                                        : specificReq.emergency_type === 'Road Accident' ? 
                                        <img src={roadaccident} alt="roadaccident" />
                                        : specificReq.emergency_type === 'Theft_Property Damage' ? 
                                        <img src={theft} alt="theft" />
                                        : specificReq.emergency_type === 'Suspicious Activity' ? 
                                        <img src={suscpicious} alt="suscpicious" />
                                        : specificReq.emergency_type === 'Other Emergency' ? 
                                        <img src={escort} alt="escort" />
                                        : 'N/A'
                                    }

                                </div>
                            </div>
                        </div>
                        {/* Emergency Type Section */}
                        <div className='section-2'>
                            <div className='emer-type'>
                                <p className='m-0 pt-3 highlight'>
                                    <i className="fa-solid fa-notes-medical"></i> 
                                    &nbsp;Emergency Concern:
                                </p>
                                <p className='m-0 py-2 data fs-5' style={{fontWeight: "bold"}}> 
                                    {specificReq.emergency_type}
                                </p>
                            </div>
                        </div>
                        {/* Location Section */}
                        <div className='section-3'>
                            <div className='location'>
                                <p className='m-0 pt-3 highlight'>
                                    <i className="fa-solid fa-map-location-dot"></i>&nbsp;Locate
                                </p>
                                <div className='m-0 py-2 data fs-5'>
                                    <button 
                                        className='go-to-location p-1 px-2 mx-1 w-100' 
                                        onClick={() => handleLocateBtn(specificReq.location)}
                                    >
                                        <i className="fa-solid fa-location-crosshairs"></i> Locate
                                    </button>
                                </div>
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
                                        <AcceptButton 
                                            reqID={specificReq.id} 
                                            adminRoute={findAdmin.route} 
                                            adminName={findAdmin.userName} 
                                            reqType={specificReq.emergency_type}
                                            token={specificUserReq.fcmToken}
                                        />
                                        {/* <DeclineButton 
                                            reqID={specificReq.id} 
                                            adminRoute={findAdmin.route} 
                                            adminName={findAdmin.userName} 
                                            reqType={specificReq.emergency_type}
                                            token={specificUserReq.fcmToken}
                                        /> */}
                                    </div>
                                </div>
                            )}
                            {specificReq.status === 'Ongoing' && (
                                <CompleteButton 
                                    reqID={specificReq.id} 
                                    adminRoute={findAdmin.route}
                                    adminName={findAdmin.userName} 
                                    reqType={specificReq.emergency_type}
                                    token={specificUserReq.fcmToken}
                                />
                            )}
                            {specificReq.status === 'Inqueue' && (
                                <div className="inqueue-cont">
                                    <div className="status-title">
                                        <p className="mb-2">Status:</p>
                                    </div>
                                    <div className='inqueue-bar py-2'>
                                        <p className="m-0">
                                            <i className="fa-regular fa-clock"></i>  In Queue
                                        </p>
                                    </div>
                                </div>
                            )}
                            {specificReq.status === 'Complete' && (
                                <div className="completed-cont">
                                    <div className="status-title">
                                        <p className="mb-2">Status:</p>
                                    </div>
                                    <div className="completed-bar py-2">
                                        <p className="m-0">
                                            <i className="fa-regular fa-circle-check"></i> Complete
                                        </p>
                                    </div>
                                    <div className="status-complete py-2">
                                        <p>Completed at » {specificReq.time_completed}</p>
                                    </div>
                                </div>
                            )}
                            {specificReq.status === 'Declined' && (
                                <div className="declined-cont">
                                    <div className="status-title">
                                        <p className="mb-2">Status:</p>
                                    </div>
                                    <div className="declined-bar py-2">
                                        <p className="m-0">
                                            <i className="fa-solid fa-xmark"></i> Declined
                                        </p>
                                    </div>
                                    <div className="status-complete py-2">
                                        <p>Declined » {specificReq.time_completed}</p>
                                    </div>
                                </div>
                            )}
                            {['New', 'Ongoing', 'Complete', 'Inqueue', 'Declined'].indexOf(specificReq.status) === -1 && 'N/A'}
                        </div>
                    </div>

                    {/* Info-right */}
                        <div className='info-right p-3 d-flex'>
                            {specificReq.additional_information && (
                                <div className="additional-cont pb-3">
                                    <div>
                                        <p className="m-0">
                                            <i className="fa-solid fa-circle-info"></i> Additional Information:
                                        </p>
                                    </div>
                                    
                                    <div className="add-info py-2">
                                        {specificReq.additional_information}
                                    </div>
                                </div>
                            )}
                            
                            {users.filter(user => user.id === specificReq.userID ).map(user => (
                                <div className="person-info-cont p-3" key={user.id}>
                                    <div className='person-info py-2 px-3 d-flex align-items-center'>
                                        <div>
                                            <p className='m-0'><i className="fa-regular fa-user"></i> Person Information</p>
                                        </div>
                                        <div className="message-person-btn-cont ms-auto">
                                            <button className='go-to-message p-1 px-3 mx-1' onClick={() => handleMessage()}>
                                                <i className="fa-solid fa-message"></i>&nbsp;Message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <div className='name_gender d-flex px-2'>
                                            <div className='person_name w-50'>
                                                <p className='m-0 forLabel'>Name</p>
                                                <div className="overflow-y-auto">
                                                    <p className='m-0 py-2'>» {user.fullname}</p>
                                                </div>
                                            </div>
                                            <div className='person_gender w-50 ps-3'>
                                                <p className='m-0 forLabel'>Gender</p>
                                                <p className='m-0 py-2'>» {user.gender}</p>
                                            </div>
                                        </div>

                                        <div className='occup_cont d-flex px-2'>
                                            <div className='person_occupation w-50'>
                                                <p className='m-0 forLabel'>Occupation</p>
                                                <p className='m-0 py-2'>» {user.occupation}</p>
                                            </div>
                                            <div className='person_contact w-50 ps-3'>
                                                <p className='m-0 forLabel'>Contact</p>
                                                <p className='m-0 py-2'>» {user.contact}</p>
                                            </div>
                                        </div>

                                        <div className='email_cont px-2'>
                                            <div className='person_email'>
                                                <p className='m-0 forLabel'>Email</p>
                                                <p className='m-0 py-2'>» {user.email}</p>
                                            </div>
                                        </div>
                                        {/* 
                                        <div className='button_cont mt-3 px-2 py-3'>
                                            <div className='call_message d-flex'>
                                                <button className='call-btn py-2'><i className="fa-regular fa-message"></i> Message</button>
                                                <div className='forOr d-flex'>
                                                    <p className='m-0'>or</p>
                                                </div>
                                                <button className='chat-btn py-2'><i className="fa-solid fa-phone"></i> Call</button>
                                            </div>
                                        </div> */}
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        )
    )
}

export default Emergency_info