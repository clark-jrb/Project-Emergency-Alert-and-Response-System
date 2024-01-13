import React from 'react'

const DeclineButton = ({ userID }) => {
    return (
        <div className='decline-cont w-50'>
            <button className='decline-btn w-100 py-2'><i className="fa-solid fa-xmark"></i> Decline</button>
        </div>
    )
}

export default DeclineButton