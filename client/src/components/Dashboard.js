import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext'
import { useUsersContext } from '../context/UsersContext'
import { useRequestContext } from '../context/RequestContext'
import '../styles/dashboard.css'
import DashboardTotals from '../views/Dashboard/dashboard-totals'
import DashboardEdit from '../views/Dashboard/dashboard-edit'

const Dashboard = () => {
    const { currentUserRole } = useAuth()
    const { admins } = useUsersContext()
    const { requests } = useRequestContext()

    return (
        <div className='dashboard-content p-4'>
            <div className='dashboard py-4 d-flex'>
                <DashboardEdit requests={requests} currentUserRole={currentUserRole} admins={admins}/>
                <DashboardTotals requests={requests} currentUserRole={currentUserRole} admins={admins}/>
            </div>
        </div>
    )
}

export default React.memo(Dashboard)