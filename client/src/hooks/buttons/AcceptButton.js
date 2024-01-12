import React, { useState } from 'react'

const AcceptButton = ({ reqID }) => {
    const [ click , setClick ] = useState(reqID)

    const handleClick = (e) => {
        setClick(e)
        console.log(click)
    }
    
    return (
        <div className='accept-cont w-50'>
            <button className='accept-btn w-100 py-2' onClick={() => handleClick(reqID)}>Accept</button>
        </div>
    )
}

export default AcceptButton