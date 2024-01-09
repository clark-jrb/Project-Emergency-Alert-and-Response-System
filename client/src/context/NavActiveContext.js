import React, { createContext, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

const NavActiveContext = createContext()

export const NavActiveProvider = ({ children }) => {
    const location = useLocation()
    
    const currentPathname = location.pathname
    const [NavActive, setNavActive] = useState(currentPathname)

    const setTheNav = (id) => {
        setNavActive(id)
    }

    return (
    <NavActiveContext.Provider value={{ NavActive, setTheNav }}>
        {children}
    </NavActiveContext.Provider>
    )
}

export const useNavActiveContext = () => {
    return useContext(NavActiveContext)
}
