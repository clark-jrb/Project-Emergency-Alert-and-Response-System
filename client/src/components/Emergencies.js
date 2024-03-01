import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/emergencies.css'
import EmergencyInfo from '../views/Emergencies/emergency-info'
import EmergencyLists from '../views/Emergencies/emergency-lists'
import { RequestInfoProvider } from '../context/RequestInfoContext'
import { FilterListProvider } from '../context/FilterListContext'
import { OngoingArrayProvider } from '../context/OngoingArray'

const Emergencies = () => {
    return (
        <div className='emergency-content p-4'>
            
                <RequestInfoProvider>
                    <OngoingArrayProvider>
                        <FilterListProvider>
                            <EmergencyLists/>
                            <EmergencyInfo/>
                        </FilterListProvider>
                    </OngoingArrayProvider>
                </RequestInfoProvider>
        </div>
    )
}

export default React.memo(Emergencies)