import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo/clsu_logo.png'
import '../styles/navbar.css'
import { ReactComponent as DashboardIcon } from '../images/icons/dashboard.svg'
// import dashboardHoverSVG from '../images/icons/dashboard-hover.svg'
import { ReactComponent as EmergencyIcon } from '../images/icons/emergency.svg'

const NavBar = () => {
    const { currentUser, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    // const [isHovered, setHovered] = useState(false);
    
    // const handleMouseOver = () => {
    //     setHovered(true);
    // };

    // const handleMouseOut = () => {
    //     setHovered(false);
    // };
    
    // const iconSrc = isHovered ? dashboardHoverSVG : dashboardSVG;

    return (
        <nav className="navbar">
            <div className="nav-top p-1">
                <a className="navbar-brand mx-2" href="dashboard">
                    <img src={logo} alt="logo" width="35" height="35" class="d-inline-block align-text-middle"></img>
                    <span className="system-name mx-1">EARS</span>
                </a>
                
                <div className="status-bar d-flex align-items-center">
                    <i class="fa-regular fa-bell fa-xl"></i>
                </div>

                <button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className="nav-bottom px-2">
                <ul>    
                    <li>
                        <Link to="dashboard">
                            <DashboardIcon className="dashboard-icon" height="25" width="25"/>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="emergencies">
                            <EmergencyIcon className="emergency-icon" height="25" width="25"/>
                            Emergencies
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar