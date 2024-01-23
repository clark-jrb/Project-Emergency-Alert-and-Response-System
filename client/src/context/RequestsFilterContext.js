import React, { createContext, useContext, useState } from 'react'

const RequestsFilterContext = createContext()

export const useRequestsFilterContext = () => {
    return useContext(RequestsFilterContext)
}

export const FilterRequestsProvider = ({ children }) => {
    const [levelFilter, setLevelFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('Complete')
    const [monthFilter, setMonthFilter] = useState('')
    const [yearFilter, setYearFilter] = useState('')
    // const [typeFilter, setTypeFilter] = useState('')

    const setTheLevelFilter = (e) => {
        setLevelFilter(e)
    }

    const setTheStatusFilter = (e) => {
        setStatusFilter(e)
    }

    const setTheMonthFilter = (e) => {
        setMonthFilter(e)
    }

    const setTheYearFilter = (e) => {
        setYearFilter(e)
    }
    
    return (
        <RequestsFilterContext.Provider 
            value={{ 
                levelFilter,
                statusFilter,
                monthFilter,
                yearFilter,
                setTheLevelFilter,
                setTheStatusFilter,
                setTheMonthFilter,
                setTheYearFilter
            }}>
            {children}
        </RequestsFilterContext.Provider>
    )
}

