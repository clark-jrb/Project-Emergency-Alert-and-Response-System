import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { currentUser, signOut } = useAuth()

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <div>
            {currentUser ? (
                <>
                <h2>Dashboard</h2>

                <p>Hello, {currentUser.email}!</p>
                <button className='btn btn-dark' onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    )
}

export default Dashboard