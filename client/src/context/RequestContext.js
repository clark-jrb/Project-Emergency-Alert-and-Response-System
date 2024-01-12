import { createContext, useContext, useState, useEffect, useRef } from 'react'

const RequestContext = createContext()

export const useRequestContext = () => {
    return useContext(RequestContext)
}

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([])
    const hasFetched = useRef(false)

    // const allRequests = requests

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

    // console.log(allRequests);
    // useEffect(() => {
    //     // This useEffect will run every time 'requests' is updated
    //     if (requests.length > 0) {
    //         console.log('All Requests:', requests);
    //         // Now you can use allRequests safely
    //     }
    // }, [requests]);

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

