import React, { createContext, useContext, useState } from 'react'

const FilterListContext = createContext()

export const useFilterListContext = () => {
    return useContext(FilterListContext)
}

export const FilterListProvider = ({ children }) => {
    const [activeFilter, setActiveFilter] = useState('New')

    const setTheFilter = (id) => {
        setActiveFilter(id)
    }

    return (
    <FilterListContext.Provider value={{ activeFilter, setTheFilter }}>
        {children}
    </FilterListContext.Provider>
    )
}

