import React, { createContext, useContext, useState } from 'react'

const LocateContext = createContext()

export const LocateProvider = ({ children }) => {
    const [toLocate, setToLocate] = useState([])

    const setLocation = (id) => {
        setToLocate(id)
    }

    return (
    <LocateContext.Provider value={{ toLocate, setLocation }}>
        {children}
    </LocateContext.Provider>
    )
}

export const useLocateContext = () => {
    return useContext(LocateContext)
}
