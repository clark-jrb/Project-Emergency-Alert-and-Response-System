import React, { useState } from 'react';
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const DashboardEdit = ({ currentUser, admins }) => {
    const findAdmin = admins.find(admin => admin.id === currentUser.uid);
    const [activeStatus, setActiveStatus] = useState(findAdmin.status)

    const rtCollection = collection(db, `response_team`) 
    const specDoc = doc(rtCollection, findAdmin.id)

    const handleSetStatus = (e) => {
        setActiveStatus(e)

        updateDoc(specDoc, {
            status: e
        })
    }

    return (
        <div className='adminProfile d-flex px-4'>
            <div className='set-admin-status'>
                <span style={{color: "var(--font-text)"}}>
                    <p className='m-0'>Set status</p>
                </span>
                <div className='set-status-buttons d-flex p-2 my-2 online'>
                    <div className={`set-online p-2 ${activeStatus === 'online' ? 'active' : ''}`} onClick={() => handleSetStatus('online')}>
                        <i className="fa-solid fa-circle"/> Online
                    </div>
                    <div className={`set-away p-2 ${activeStatus === 'away' ? 'active' : ''}`} onClick={() => handleSetStatus('away')}>
                        <i className="fa-regular fa-circle-xmark"/> Away
                    </div>
                </div>
            </div>

            <div className=''></div>

            <div className=''></div>
        </div>
    )
}

export default DashboardEdit