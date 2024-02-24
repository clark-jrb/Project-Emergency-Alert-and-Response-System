import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext'
import { useUsersContext } from '../context/UsersContext'
import { useRequestContext } from '../context/RequestContext'
import '../styles/dashboard.css'
import Siren from '../images/logo/siren.png'
import Ongoing from '../images/logo/ongoing.png'
import Cancel from  '../images/logo/cancel.png'
import Checked from '../images/logo/checked.png'

const Dashboard = () => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const { requests } = useRequestContext()

    const isResponder = admins.some(admin => admin.id === currentUser.uid);

    let totalRequest = requests.length;
    let completedRequest = requests.filter(request => request.status === 'Complete').length;
    let ongoingRequest = requests.filter(request => request.status === 'Ongoing').length;
    let canceledRequest = requests.filter(request => request.status === 'Declined').length;

    console.log(completedRequest);

    return (
        <div className='dashboard-content p-4'>
            <div className='dashboard p-4 d-flex'>
                <div className='adminProfile'></div>
                <div className='forContent d-flex'>

                    <div className='totals-section d-flex px-4'>
                        <div className='total-emergency d-flex p-4'>
                            <div className='total-icon'>
                                <img src={Siren} alt='siren-logo'/>
                            </div>
                            <div className='total-title'>
                                <p className='m-0 total-count'>{totalRequest}</p>
                                <p className='m-0'>Total Emergencies</p>
                            </div>
                        </div>

                        <div className='total-ongoing d-flex p-4'>
                            <div className='total-icon'>
                                <img src={Ongoing} alt='ambulance-logo'/>
                            </div>
                            <div className='total-title'>
                                <p className='m-0 total-count'>{ongoingRequest}</p>
                                <p className='m-0'>Total On Going</p>
                            </div>
                        </div>

                        <div className='total-complete d-flex p-4'>
                            <div className='total-icon'>
                                <img src={Checked} alt='checked-logo'/>
                            </div>
                            <div className='total-title'>
                                <p className='m-0 total-count'>{completedRequest}</p>
                                <p className='m-0'>Total Completed</p>
                            </div>
                        </div>

                        <div className='total-canceled d-flex p-4'>
                            <div className='total-icon'>
                                <img src={Cancel} alt='cancel-logo'/>
                            </div>
                            <div className='total-title'>
                                <p className='m-0 total-count'>{canceledRequest}</p>
                                <p className='m-0'>Total Canceled</p>
                            </div>
                        </div>
                    </div>

                    <div className='history-section'>

                    </div>
                </div>
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