import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestInfoContext } from '../../context/RequestInfoContext'

const Emergency_info = () => {
    const { requestID } = useRequestInfoContext()

    useEffect(() => {
        console.log(requestID)
    }, [requestID])

    return (
        <div className='emergency-info'>
            <h2>{requestID}</h2>
        </div>
    )
}

export default Emergency_info