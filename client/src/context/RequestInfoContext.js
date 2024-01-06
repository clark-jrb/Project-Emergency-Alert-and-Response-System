import React, { createContext, useContext, useState } from 'react'

const RequestInfoContext = createContext()

export const RequestInfoProvider = ({ children }) => {
    const [requestID, setRequestID] = useState(null)

    const setID = (id) => {
        setRequestID(id)
    }

    return (
    <RequestInfoContext.Provider value={{ requestID, setID }}>
        {children}
    </RequestInfoContext.Provider>
    )
}

export const useRequestInfoContext = () => {
    return useContext(RequestInfoContext)
}
