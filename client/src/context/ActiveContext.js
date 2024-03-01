import React, { createContext, useContext, useState } from 'react'

const ActiveContext = createContext()

export const ActiveProvider = ({ children }) => {

    const [active, setActive] = useState(null)
    const [activeUser, setActiveUser] = useState(null)
    const [activeAdmin, setActiveAdmin] = useState(null)

    const setTheActive = (id) => {
        setActive(id)
    }

    const setTheActiveUser = (id) => {
        setActiveUser(id)
    }

    const setTheActiveAdmin = (id) => {
        setActiveAdmin(id)
    }

    // console.log(activeUser);

    return (
    <ActiveContext.Provider value={{ 
        active, 
        setTheActive, 
        activeUser,
        setTheActiveUser,
        activeAdmin,
        setTheActiveAdmin
    }}>
        {children}
    </ActiveContext.Provider>
    )
}

export const useActiveContext = () => {
    return useContext(ActiveContext)
}
