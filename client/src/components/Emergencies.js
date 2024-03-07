import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/emergencies.css'
import EmergencyInfo from '../views/Emergencies/emergency-info'
import EmergencyLists from '../views/Emergencies/emergency-lists'
import { RequestInfoProvider } from '../context/RequestInfoContext'
import { FilterListProvider } from '../context/FilterListContext'
import { OngoingArrayProvider } from '../context/OngoingArray'
import { useActiveContext } from '../context/ActiveContext'
import BellSelectIcon from '../images/icons/bell-select.png'

const Emergencies = () => {
    const { active } = useActiveContext()

    return (
        <div className='emergency-content p-4'>
            
                <RequestInfoProvider>
                    <OngoingArrayProvider>
                        <FilterListProvider>
                            <EmergencyLists/>
                            <div className='emergency-info p-4'>
                                {active === null ? 
                                    <>
                                        <div className='waiting-cont h-100 w-100 d-flex'>
                                            <div className='no-chat-cont'>
                                                <img src={BellSelectIcon} alt='bell-select-icon'></img>
                                                No emergency selected
                                            </div>
                                        </div>
                                    </> 
                                        : 
                                    <>
                                        <EmergencyInfo/>
                                    </>
                                }
                            </div>
                        </FilterListProvider>
                    </OngoingArrayProvider>
                </RequestInfoProvider>
        </div>
    )
}

export default React.memo(Emergencies)