import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext'
import { useUsersContext } from '../context/UsersContext'
import { useRequestContext } from '../context/RequestContext'
import '../styles/dashboard.css'
import DashboardTotals from '../views/Dashboard/dashboard-totals'
import DashboardEdit from '../views/Dashboard/dashboard-edit'

const Dashboard = () => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const { requests } = useRequestContext()

    const isResponder = admins.some(admin => admin.id === currentUser.uid);

    return (
        <div className='dashboard-content p-4'>
            <div className='dashboard py-4 d-flex'>
                <DashboardEdit requests={requests} currentUser={currentUser} admins={admins}/>
                <DashboardTotals requests={requests} currentUser={currentUser} admins={admins}/>
            </div>
            {/* {currentUser.uid ? (
                <>
                <h2>Dashboard</h2>

                {isResponder ? (
                    <>
                        <p>You are an admin.</p>
                        {admins.filter(admin => admin.id === currentUser.uid).map(admin => (
                            <div key={admin.id}>
                                <p>Hello {admin.userName}</p>
                                <p> {admin.rt_name}</p> 
                                <p> {admin.status}</p>
                                <p> {admin.contact_no}</p>
                            </div>
                        ))}
                    </>
                        
                    ) : (
                        <p>You are not an admin.</p>
                    )}
                </>
            ) : (
                <p>You are not logged in.</p>
            )} */}
        </div>
    )
}

export default Dashboard