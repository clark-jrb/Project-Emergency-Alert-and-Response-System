import React, { createContext, useContext, useState } from 'react'

const ActiveContext = createContext()

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState(null)
    const [activeMessage, setMessageActive] = useState(null)

    const setTheActive = (id) => {
        setActive(id)
    }

    const setTheMessageActive = (id) => {
        setMessageActive(id)
    }

    return (
    <ActiveContext.Provider value={{ 
        active, 
        setTheActive, 
        activeMessage, 
        setTheMessageActive 
    }}>
        {children}
    </ActiveContext.Provider>
    )
}

export const useActiveContext = () => {
    return useContext(ActiveContext)
}
