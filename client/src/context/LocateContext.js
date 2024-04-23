import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useUsersContext } from './UsersContext'

const LocateContext = createContext()

export const LocateProvider = ({ children }) => {
    const { currentUserRole } = useAuth()
    const { admins } = useUsersContext()
    const [toLocate, setToLocate] = useState([])
    const location = useLocation()

    const findAdmin = admins.find(admin => admin.route === currentUserRole)

    const setLocation = (id) => {
        setToLocate([id.latitude, id.longitude])
    }

    const currentPathname = location.pathname

    useEffect(() => {
        if (currentPathname !== `/${findAdmin.route}/map`) {
            setToLocate([])
            // console.log(currentPathname);
        }
    }, [currentPathname, findAdmin.route]);

    return (
    <LocateContext.Provider value={{ toLocate, setLocation }}>
        {children}
    </LocateContext.Provider>
    )
}

export const useLocateContext = () => {
    return useContext(LocateContext)
}
