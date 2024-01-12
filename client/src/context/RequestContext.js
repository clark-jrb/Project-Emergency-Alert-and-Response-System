import { createContext, useContext, useState, useEffect, useRef } from 'react'

const RequestContext = createContext()

export const useRequestContext = () => {
    return useContext(RequestContext)
}

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([])
    const hasFetched = useRef(false)

    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:4000/usf/emergencies')

            if (response.ok) {
                const data = await response.json()
                setRequests(data)
            } else {
                console.log('Error occurred')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            
        fetchRequests()
        hasFetched.current = true
        }
    }, [])

    // Reload requests
    const reloadRequests = () => {
        fetchRequests();
    };

    return (
        <RequestContext.Provider value={{ requests, reloadRequests}}>
            {children}
        </RequestContext.Provider>
    )
}

