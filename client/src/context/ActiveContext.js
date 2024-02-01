import React, { createContext, useContext, useState } from 'react'

const ActiveContext = createContext()

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState(null)
    const [activeMessage, setMessageActive] = useState(null)
    const [activeUser, setActiveUser] = useState(null)

    const setTheActive = (id) => {
        setActive(id)
    }

    const setTheMessageActive = (id) => {
        setMessageActive(id)
    }

    const setTheActiveUser = (id) => {
        setActiveUser(id)
    }

    // console.log(activeUser);

    return (
    <ActiveContext.Provider value={{ 
        active, 
        setTheActive, 
        activeMessage, 
        setTheMessageActive, 
        activeUser,
        setTheActiveUser
    }}>
        {children}
    </ActiveContext.Provider>
    )
}

export const useActiveContext = () => {
    return useContext(ActiveContext)
}
