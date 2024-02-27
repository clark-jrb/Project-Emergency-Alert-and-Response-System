import React from 'react';
import { useActiveContext } from '../../context/ActiveContext';
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const DashboardEdit = ({ currentUser, admins }) => {
    const { activeStatus, setTheActiveStatus } = useActiveContext()

    const findAdmin = admins.find(admin => admin.id === currentUser.uid);

    // console.log(findAdmin.id);

    const rtCollection = collection(db, `response_team`) 
    const specDoc = doc(rtCollection, findAdmin.id)

    const handleSetStatus = (e) => {
        setTheActiveStatus(e)

        updateDoc(specDoc, {
            status: e
        })
    }

    return (
        <div className='adminProfile d-flex px-4'>
            <div className='set-admin-status'>
                <p className='m-0'>Set status</p>
                <div className='set-status-buttons d-flex p-2 online'>
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