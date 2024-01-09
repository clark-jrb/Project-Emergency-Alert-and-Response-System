import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/emergencies.css'
import Emergency_info from '../views/Emergencies/emergency-info'
import Emergency_lists from '../views/Emergencies/emergency-lists'
import { RequestInfoProvider } from '../context/RequestInfoContext'
import { RequestProvider } from '../context/RequestContext'
import { UsersProvider } from '../context/UsersContext'

const Emergencies = () => {
    return (
        <div className='emergency-content p-3'>
            <RequestProvider>
                <RequestInfoProvider>
                    <UsersProvider>
                        <Emergency_lists/>
                        <Emergency_info/>
                    </UsersProvider>
                </RequestInfoProvider>
            </RequestProvider>
        </div>
    )
}

export default Emergencies