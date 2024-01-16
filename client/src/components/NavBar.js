import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo/clsu_logo.png'
import '../styles/navbar.css'
import { ReactComponent as DashboardIcon } from '../images/icons/dashboard.svg'
import { ReactComponent as EmergencyIcon } from '../images/icons/emergency.svg'
import { ReactComponent as MessagesIcon } from '../images/icons/message.svg'
import { ReactComponent as MapIcon } from '../images/icons/map.svg'
import { ReactComponent as HistoryIcon } from '../images/icons/history.svg'
import { useNavActiveContext } from "../context/NavActiveContext"

const NavBar = () => {
    const { currentUser, signOut } = useAuth()
    const navigate = useNavigate()

    // console.log(currentUser)

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    const { NavActive, setTheNav } = useNavActiveContext()

    const handleClick = (e) => {
        setTheNav(e)
    }

    return (
        <nav className="navbar">
            <div className="nav-top p-1">
                <a className="navbar-brand mx-2" href="dashboard">
                    <img src={logo} alt="logo" width="35" height="35" className="d-inline-block align-text-middle"></img>
                    <span className="system-name mx-1">EARS</span>
                </a>
                
                <div className="status-bar d-flex align-items-center">
                    <div className="notif-animation green bell-icon p-2">
                        <i className="fa-regular fa-bell fa-xl"></i>
                    </div>
                </div>

                <button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className="nav-bottom px-3">
                <ul>    
                    <li onClick={() => handleClick('/usf/dashboard')} className={NavActive === '/usf/dashboard' ? 'active' : ''}>
                        <Link to="dashboard">
                            <DashboardIcon className="dashboard-icon" height="25" width="25"/>
                            Dashboard
                        </Link>
                    </li>
                    <li onClick={() => handleClick('/usf/emergencies')} className={NavActive === '/usf/emergencies' ? 'active' : ''}>
                        <Link to="emergencies">
                            <EmergencyIcon className="emergency-icon" height="25" width="25"/>
                            Emergencies
                        </Link>
                    </li>
                    <li onClick={() => handleClick('/usf/messages')} className={NavActive === '/usf/messages' ? 'active' : ''}>
                        <Link to="messages">
                            <MessagesIcon className="messages-icon" height="25" width="25"/>
                            Messages
                        </Link>
                    </li>
                    <li onClick={() => handleClick('/usf/map')} className={NavActive === '/usf/map' ? 'active' : ''}>
                        <Link to="map">
                            <MapIcon className="map-icon" height="25" width="25"/>
                            Map
                        </Link>
                    </li>
                    <li onClick={() => handleClick('/usf/history')} className={NavActive === '/usf/history' ? 'active' : ''}>
                        <Link to="history">
                            <HistoryIcon className="history-icon" height="25" width="25"/>
                            History
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar