import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/history.css'
import HistoryFilters from '../views/History/history-filters'
import HistoryDatas from '../views/History/history-datas'

const History = () => {
    return (
        <div className='history-content border p-4'>
            <HistoryFilters/>
            <HistoryDatas/>
        </div>
    )
}

export default History