import { createContext, useContext, useState, useEffect, useRef } from 'react'

const RequestContext = createContext()

export const useRequestContext = () => {
    return useContext(RequestContext)
}

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([])
    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
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

        fetchRequests()
        hasFetched.current = true
        }
    }, [])

    return (
        <RequestContext.Provider value={requests}>
            {children}
        </RequestContext.Provider>
    )
}

