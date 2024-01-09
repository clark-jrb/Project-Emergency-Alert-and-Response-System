import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/emergencies.css'
import EmergencyInfo from '../views/Emergencies/emergency-info'
import EmergencyLists from '../views/Emergencies/emergency-lists'
import { RequestInfoProvider } from '../context/RequestInfoContext'
import { RequestProvider } from '../context/RequestContext'
import { UsersProvider } from '../context/UsersContext'
import { ActiveProvider } from '../context/ActiveContext'
import { FilterListProvider } from '../context/FilterListContext'

const Emergencies = () => {
    return (
        <div className='emergency-content p-3'>
            <RequestProvider>
                <RequestInfoProvider>
                    <UsersProvider>

                        <FilterListProvider>
                            <ActiveProvider>
                                <EmergencyLists/>
                            </ActiveProvider>
                        </FilterListProvider>
                        

                        <EmergencyInfo/>

                    </UsersProvider>
                </RequestInfoProvider>
            </RequestProvider>
        </div>
    )
}

export default Emergencies