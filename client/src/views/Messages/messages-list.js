import React from 'react'
import GetMessages from './get-messages'
import GetCalls from './get-calls'
import { useFilterListContext } from '../../context/FilterListContext'

const MessagesList = () => {
    const { activeMessFilter, setTheMessFilter } = useFilterListContext()

    const handleClick = (component) => {
        setTheMessFilter(component)
    }

    return (
        <div className='mess-list d-flex p-4'>
            <div className='mess-sections p-2'>
                <div className={`messages-section flex-fill p-2 ${activeMessFilter === 'Messages' ? 'active' : ''}`} onClick={() => handleClick('Messages')}>
                    <h6 className='m-0'>
                        <i className="fa-regular fa-message"></i> Messages
                    </h6>
                </div>
                {/* <div className={`calls-section flex-fill p-2 ${activeMessFilter === 'Calls' ? 'active' : ''}`} onClick={() => handleClick('Calls')}>
                    <h6 className='m-0'>
                        <i className="fa-solid fa-phone"></i> Calls
                    </h6>
                </div> */}
            </div>
            <div className='mess-calls d-flex mt-3'>
                {activeMessFilter === 'Messages' && <GetMessages/>}
                {/* {activeMessFilter === 'Calls' && <GetCalls />} */}
            </div>
        </div>
    )
}

export default MessagesList