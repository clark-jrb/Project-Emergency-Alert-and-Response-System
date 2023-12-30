import React from "react"
// import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { currentUser, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }
    return (
        <div className="navbar">    
            <h2>Nav bar</h2>
            <h2>Welcome {currentUser.email}</h2>
            <button className='btn btn-dark' onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default NavBar