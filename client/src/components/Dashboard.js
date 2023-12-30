import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { currentUser } = useAuth()

    return (
        <div className='dashboard'>
            {currentUser ? (
                <>
                <h2>Dashboard</h2>

                <p>Hello, {currentUser.email}!</p>
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    )
}

export default Dashboard