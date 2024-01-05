import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


const New = () => {
    const [requests, setRequests] = useState([])
    const hasRendered = useRef(false)

    useEffect(() => {
        if (!hasRendered.current) {
            const fetchRequests = async () => {
                try {
                    const response = await fetch('http://localhost:4000/usf/emergencies')

                    console.log(response)
                    if (response.ok) {
                        const data = await response.json()
                        // console.log(response)
                        setRequests(data)
                        console.log('Data loaded!')
                    } else {
                        console.log('Error occurred')
                    }
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }

            fetchRequests()

            // Set hasRendered to true after the initial render
            hasRendered.current = true
        }

        // console.log(requests)
        
    }, [])


    return (
        <div className='request-new'>
            <h3>New</h3>
            {/* <button className='btn btn-success'>datas</button> */}
        </div>
    )
}

export default New