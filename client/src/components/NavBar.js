import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navbar.css'
import { Dropdown } from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo/clsu_logo.png'
import { ReactComponent as DashboardIcon } from '../images/icons/dashboard.svg'
import { ReactComponent as EmergencyIcon } from '../images/icons/emergency.svg'
import { ReactComponent as MessagesIcon } from '../images/icons/message.svg'
import { ReactComponent as MapIcon } from '../images/icons/map.svg'
import { ReactComponent as HistoryIcon } from '../images/icons/history.svg'
import { useNavActiveContext } from "../context/NavActiveContext"
import { useRequestContext } from "../context/RequestContext"
import { useUsersContext } from "../context/UsersContext"
import { useMessageContext } from "../context/MessagesContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../firebase"

const NavBar = () => {
    const { messCount } = useMessageContext()
    const { currentUser, signOut } = useAuth()
    const { admins } = useUsersContext()
    const navigate = useNavigate()
    const { count, recentRequest } = useRequestContext()
    const location = useLocation()
    const { NavActive, setTheNav } = useNavActiveContext()

    const findAdmin = admins.find(admin => admin.id === currentUser.uid);

    const rtCollection = collection(db, `response_team`) 
    const specDoc = doc(rtCollection, findAdmin.id)

    useEffect(() => {
        const pathSegments = location.pathname.split('/')
        const lastSegment = pathSegments[pathSegments.length - 1]
        setTheNav(lastSegment)
    }, [location, setTheNav])

    const handleSignOut = async () => {

        updateDoc(specDoc, {
            status: 'offline'
        })
        
        await signOut()
        navigate('/')
    }

    const handleClick = (e) => {
        setTheNav(e)
    }

    return (
        <nav className="navbar">
            <div className="nav-top p-1 px-3">
                <a className="navbar-brand mx-2" href="dashboard">
                    <img src={logo} alt="logo" width="35" height="35" className="d-inline-block align-text-middle"></img>
                    <span className="system-name mx-1">EARS</span>
                </a>
                
                {/* NOTIFICATION BELL  */}
                <div className="status-bar d-flex align-items-center">

                    <div className={`notif-animation bell-icon p-2 ${
                        count > 0 ? (recentRequest.emergency_level === '1' ? 
                                        "blue" : recentRequest.emergency_level === '2' ? 
                                        "green" : recentRequest.emergency_level === '3' ? 
                                        "yellow" : recentRequest.emergency_level === '4' ? 
                                        "red" : "") : ''
                    }`}>
                        {count > 0 ? 
                        <>
                            <i className="fa-regular fa-bell fa-shake fa-xl"></i>
                        </> : 
                        <>
                            <i className="fa-regular fa-bell fa-xl"></i>
                        </>}
                    </div>

                    <div className="notif-message p-2 px-3 d-flex">
                        <div className="mess-icon">
                            <i className="fa-regular fa-message fa-xl"></i>
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
                        {admins.filter(admin => admin.id === currentUser.uid).map(admin => (
                            <span className="user-name px-1" key={admin.id}>
                                <i className="fa-solid fa-circle-user"/>
                                &nbsp;
                                {admin.userName}
                            </span>
                        ))}
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
                </ul>
            </div>
        </nav>
    )
}

export default React.memo(NavBar)