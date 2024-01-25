import React, { createContext, useContext, useState } from 'react'

const FilterListContext = createContext()

export const useFilterListContext = () => {
    return useContext(FilterListContext)
}

export const FilterListProvider = ({ children }) => {
    const [activeFilter, setActiveFilter] = useState('New')
    const [activeMessFilter, setActiveMessFilter] = useState('Messages')

    const setTheFilter = (id) => {
        setActiveFilter(id)
    }

    const setTheMessFilter = (id) => {
        setActiveMessFilter(id)
    }

    return (
    <FilterListContext.Provider value={{ 
        activeFilter, 
        setTheFilter, 
        activeMessFilter, 
        setTheMessFilter
    }}>
        {children}
    </FilterListContext.Provider>
    )
}

