import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/emergencies.css'
import EmergencyInfo from '../views/Emergencies/emergency-info'
import EmergencyLists from '../views/Emergencies/emergency-lists'
import { RequestInfoProvider } from '../context/RequestInfoContext'
import { ActiveProvider } from '../context/ActiveContext'
import { FilterListProvider } from '../context/FilterListContext'

const Emergencies = () => {
    return (
        <div className='emergency-content p-4'>
            
                <RequestInfoProvider>

                        <FilterListProvider>
                            <ActiveProvider>
                                <EmergencyLists/>
                            </ActiveProvider>

                            <EmergencyInfo/>
                        </FilterListProvider>
                        
                </RequestInfoProvider>
        </div>
    )
}

export default Emergencies