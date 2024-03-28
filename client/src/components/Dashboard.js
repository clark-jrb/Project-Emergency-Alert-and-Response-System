import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext'
import { useUsersContext } from '../context/UsersContext'
import { useRequestContext } from '../context/RequestContext'
import '../styles/dashboard.css'
import DashboardTotals from '../views/Dashboard/dashboard-totals'
import DashboardEdit from '../views/Dashboard/dashboard-edit'
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const Dashboard = () => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const { requests } = useRequestContext()

    const findAdmin = admins.find(admin => admin.id === currentUser.uid);

    const rtCollection = collection(db, `response_team`) 
    const specDoc = doc(rtCollection, findAdmin.id)

    useEffect(() => {
        updateDoc(specDoc, {
            status: 'online'
        })
        // console.log('Welcome, you are now online!');
    }, [specDoc]);

    // const isResponder = admins.some(admin => admin.id === currentUser.uid);

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

export default React.memo(Dashboard)