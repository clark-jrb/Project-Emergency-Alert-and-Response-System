import React from 'react'

const GetMessages = () => {
    return (
        <div className='get-messages'>
            <div className='message-person-con container py-2'>
                {/* Person Name Initials */}
                <div className='name-logo'>
                    <p className='m-0'>CJ</p>
                </div>
                {/* Message */}
                <div className='message-info'>
                    {/* Person Name */}
                    <p className='m-0 person-name'>Clark John Busuego</p>
                    {/* Person Message */}
                    <div className='person-mess-cont d-flex'>
                        <p className='m-0 person-message'>Need help need ko momol</p>
                        <span className='timestamp'> • 55m</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetMessages