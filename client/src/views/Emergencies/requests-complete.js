import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Complete = () => {
    const [requests, setRequests] = useState(null)
    const hasRendered = useRef(false)

    useEffect(() => {
        if (!hasRendered.current) {
            const fetchRequests = async () => {
                try {
                    const response = await fetch('/usf/emergencies')

                    if (response.ok) {
                        setRequests(response)
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
    }, [])

    return (
        <div className='request-complete'>
            <h3>Complete</h3>
        </div>
    )
}

export default Complete