import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navbar.css'
import { Dropdown } from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as DashboardIcon } from '../images/icons/dashboard.svg'
import { ReactComponent as EmergencyIcon } from '../images/icons/emergency.svg'
import { ReactComponent as MessagesIcon } from '../images/icons/message.svg'
import { ReactComponent as MapIcon } from '../images/icons/map.svg'
import { ReactComponent as HistoryIcon } from '../images/icons/history.svg'
import { useNavActiveContext } from "../context/NavActiveContext"
import { useRequestContext } from "../context/RequestContext"
import { useUsersContext } from "../context/UsersContext"
import { useMessageContext } from "../context/MessagesContext"
import { useActiveContext } from "../context/ActiveContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../firebase"
import { logUserAction } from "../utils/LogsAction"

const NavBar = ({ logo }) => {
    const { currentUser, signOut, currentUserRole } = useAuth()
    const { setTheActive } = useActiveContext()
    const { NavActive, setTheNav } = useNavActiveContext()
    const { count, recentRequest } = useRequestContext()
    const { messCount } = useMessageContext()
    const { admins, rtUsers } = useUsersContext()
    const navigate = useNavigate()
    const location = useLocation()

    const findAdmin = admins.find(admin => admin.route === currentUserRole);
    const findRTUser = rtUsers.find(rt => rt.email === currentUser.email)

    // useEffect(() => {
    //     console.log(findRTUser);
        
    // }, [findRTUser]);

    const rtCollection = collection(db, `response_team`) 
    const specDoc = doc(rtCollection, findAdmin.id)

    useEffect(() => {
        const pathSegments = location.pathname.split('/')
        const lastSegment = pathSegments[pathSegments.length - 1]
        setTheNav(lastSegment)
    }, [location, setTheNav])

    const handleSignOut = async () => {
        setTheActive(null)
        updateDoc(specDoc, {
            status: 'offline'
        })
        
        await signOut()
        logUserAction('sign_out', findRTUser)
        navigate('/')
    }

    const handleClick = (e) => {
        setTheNav(e)
    }

    return (
        <nav className="navbar">
            <div className="nav-top p-1 px-3">
                <p className="ears-brand mx-2 mb-0">
                    <img src={logo} alt="logo-clsu"></img>
                    <span className="system-name mx-1">EARS</span>
                </p>
                
                {/* NOTIFICATION BELL  */}
                <div className="status-bar d-flex align-items-center">

                    <div className={`notif-animation bell-icon p-2 ${
                        count > 0 ? (recentRequest.emergency_level === '1' ? 
                                        "blue" : recentRequest.emergency_level === '2' ? 
                                        "green" : recentRequest.emergency_level === '3' ? 
                                        "yellow" : recentRequest.emergency_level === '4' ? 
                                        "red" : "") : ''
                    }`}
                    >
                        <Link to="emergencies" onClick={() => handleClick('emergencies')}>
                            {count > 0 ? 
                            <>
                                <i className="fa-regular fa-bell fa-shake fa-xl"></i>
                            </> : 
                            <>
                                <i className="fa-regular fa-bell fa-xl"></i>
                            </>}
                        </Link>
                    </div>

                    <div className="notif-message p-2 px-3 d-flex">
                        <div className="mess-icon">
                            <Link to="messages" onClick={() => handleClick('messages')}>
                                {messCount > 0 ? 
                                <>
                                    <i className="fa-regular fa-message fa-bounce fa-xl"></i>
                                </> : 
                                <>
                                    <i className="fa-regular fa-message fa-xl"></i>
                                </>}
                            </Link>
                        </div>

                        {messCount > 0 ? 
                        <>
                            <div className="mess-count">
                                <span className="m-0">{messCount}</span>
                            </div>
                        </> : 
                        <>
                            <div></div>
                        </>}
                        
                    </div>

                    
                    
                </div>

                <Dropdown className="mx-2">
                    <Dropdown.Toggle variant="custom" id="dropdown-basic" className="dropdown-profile">
                            <span className="user-name px-1">
                                {findRTUser.role === 'usf' ? 
                                <>
                                    <i className="fa-solid fa-shield-halved icon-usf-font"></i>
                                </> : findRTUser.role === 'infirmary' ? 
                                <>
                                    <i className="fa-solid fa-house-medical icon-infirmary-font"></i>
                                </> :
                                <>
                                    <i className="fa-solid fa-circle-user"/>
                                </>}
                                &nbsp;
                                {findRTUser.displayName}
                            </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* <button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button> */}
            </div>
            <div className="nav-bottom px-3">
                <ul>    
                    <li className={NavActive === 'dashboard' ? 'active' : ''}>
                        <Link to="dashboard" onClick={() => handleClick('dashboard')}>
                            <DashboardIcon className="dashboard-icon" height="25" width="25"/>
                            Dashboard
                        </Link>
                    </li>

                    <li className={NavActive === 'emergencies' ? 'active' : ''}>
                        <Link to="emergencies" onClick={() => handleClick('emergencies')}>
                            <EmergencyIcon className="emergency-icon" height="25" width="25"/>
                            Emergencies
                        </Link>
                    </li>

                    <li className={NavActive === 'messages' ? 'active' : ''}>
                        <Link to="messages" onClick={() => handleClick('messages')}>
                            <MessagesIcon className="messages-icon" height="25" width="25"/>
                            Messages
                        </Link>
                    </li>

                    <li className={NavActive === 'map' ? 'active' : ''}>
                        <Link to="map" onClick={() => handleClick('map')}>
                            <MapIcon className="map-icon" height="25" width="25"/>
                            Map
                        </Link>
                    </li>

                    <li className={NavActive === 'history' ? 'active' : ''}>
                        <Link to="history" onClick={() => handleClick('history')}>
                            <HistoryIcon className="history-icon" height="25" width="25"/>
                            History
                        </Link>
                    </li>

                    <li className={NavActive === 'logs' ? 'active' : ''}>
                        <Link to="logs" onClick={() => handleClick('logs')}>
                            <i className="fa-regular fa-file-lines fa-lg"></i>
                            User Logs
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default React.memo(NavBar)