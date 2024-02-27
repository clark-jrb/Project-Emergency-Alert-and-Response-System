import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'
import { useUsersContext } from './UsersContext'

const ActiveContext = createContext()

export const ActiveProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()

    const findAdmin = admins.find(admin => admin.id === currentUser.uid);

    const [active, setActive] = useState(null)
    const [activeUser, setActiveUser] = useState(null)
    const [activeAdmin, setActiveAdmin] = useState(null)
    const [activeStatus, setActiveStatus] = useState(findAdmin.status)

    const setTheActive = (id) => {
        setActive(id)
    }

    const setTheActiveUser = (id) => {
        setActiveUser(id)
    }

    const setTheActiveAdmin = (id) => {
        setActiveAdmin(id)
    }

    const setTheActiveStatus = (id) => {
        setActiveStatus(id)
    }

    // console.log(activeUser);

    return (
    <ActiveContext.Provider value={{ 
        active, 
        setTheActive, 
        activeUser,
        setTheActiveUser,
        activeAdmin,
        setTheActiveAdmin,
        activeStatus,
        setTheActiveStatus
    }}>
        {children}
    </ActiveContext.Provider>
    )
}

export const useActiveContext = () => {
    return useContext(ActiveContext)
}
