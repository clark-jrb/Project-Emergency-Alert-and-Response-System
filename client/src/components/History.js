import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/history.css'
import HistoryFilters from '../views/History/history-filters'
import HistoryDatas from '../views/History/history-datas'
import { FilterRequestsProvider } from '../context/RequestsFilterContext'

const History = () => {
    return (
        <div className='history-content border p-4'>
            <FilterRequestsProvider>
                <HistoryFilters/>
                <HistoryDatas/>
            </FilterRequestsProvider>
        </div>
    )
}

export default History