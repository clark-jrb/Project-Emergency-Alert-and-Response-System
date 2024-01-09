import React, { createContext, useContext, useState } from 'react'

const ActiveContext = createContext()

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState(null)

    const setTheActive = (id) => {
        setActive(id)
    }

    return (
    <ActiveContext.Provider value={{ active, setTheActive }}>
        {children}
    </ActiveContext.Provider>
    )
}

export const useActiveContext = () => {
    return useContext(ActiveContext)
}
