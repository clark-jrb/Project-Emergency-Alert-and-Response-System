import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestsFilterContext } from '../../context/RequestsFilterContext'

const HistoryFilters = () => {
    // State to manage the selected value
    const { setTheLevelFilter, setTheMonthFilter, setTheYearFilter } = useRequestsFilterContext()
    const [month, setMonth] = useState('Month')
    const [year, setYear] = useState('Year')
    const [filterLvlActive, setFilterLvlActive] = useState('all')

    // Handler function to update the selected value
    const handleMonthChange  = (event) => {
        setMonth(event.target.value)
        setTheMonthFilter(event.target.value)
    }

    const handleYearChange  = (event) => {
        setYear(event.target.value)
        setTheYearFilter(event.target.value)
    }

    // reset buttons

    const resetMonth = () => {
        setMonth('Month')
        setTheMonthFilter('')
    }

    const resetYear = () => {
        setYear('Year')
        setTheYearFilter('')
    }

    const resetLevel = (e) => {
        setTheLevelFilter('')
        setFilterLvlActive(e)
    }

    // HandleClick to filter emergency level
    const handleFilterLevel = (e) => {
        setTheLevelFilter(e)
        setFilterLvlActive(e)
    }

    // List of months for the dropdown
    const years = ['2023', '2024']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    

    return (
        <div className='history-filters'>
            <div className='sortByDate mx-4 mt-4 mb-0 pb-3'>
                <div className='sort-title'>
                    <p className='m-0'>Sort by Date</p>
                </div>

                <div className='forMonth d-flex pt-3'>
                    <p className='m-0 title-date px-1'>» Month</p>
                    <select className='select-box px-2' onChange={handleMonthChange} value={month}>
                        <option disabled>Month</option>
                        {/* Map through months and create option elements */}
                        {months.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    <div className='reset-btn px-2' onClick={resetMonth}>
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                    </div>
                </div>

                <div className='forYear d-flex pt-3'>
                    <p className='m-0 title-date px-1'>» Year</p>
                    <select className='select-box px-2' onChange={handleYearChange} value={year}>
                        <option disabled>Year</option>
                        {/* Map through months and create option elements */}
                        {years.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    <div className='reset-btn px-2' onClick={resetYear}>
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                    </div>
                </div>

            </div>
            <div className='sortByLevel px-4 pt-3'>
                <div className='sort-title pt-2'>
                    <p className='m-0 lvl-title'>Level of Emergency</p>
                    {/* set all */}
                    <div className={`all-btn ${filterLvlActive === 'all' ? 'active' : ''}`} onClick={() => resetLevel('all')}>
                        All <i className="fa-solid fa-check-double"></i>
                    </div>
                </div>
                {/* LEVEL 1 */}
                {/* <div className={`forLvl one d-flex mt-3 ${filterLvlActive === '1' ? 'active' : ''}`} onClick={() => handleFilterLevel('1')}>
                    <div className='lvl-logo one w-25'>
                        <p className='m-0'>L1</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-2'>
                            <p className='m-0 highlight one'>NON-URGENT</p>
                            <p className='m-0 description'>Minor Emergency</p>
                        </div>
                    </div>
                </div> */}
                {/* LEVEL 2 */}
                {/* <div className={`forLvl two d-flex mt-3 ${filterLvlActive === '2' ? 'active' : ''}`} onClick={() => handleFilterLevel('2')}>
                    <div className='lvl-logo two w-25'>
                        <p className='m-0'>L2</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-2'>
                            <p className='m-0 highlight two'>SEMI-URGENT</p>
                            <p className='m-0 description'>Non Life Threatening</p>
                        </div>
                    </div>
                </div> */}
                {/* LEVEL 3 */}
                <div className={`forLvl three d-flex mt-3 ${filterLvlActive === '3' ? 'active' : ''}`} onClick={() => handleFilterLevel('3')}>
                    <div className='lvl-logo three w-25'>
                        <p className='m-0'>URG</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-2'>
                            <p className='m-0 highlight three'>URGENT</p>
                            <p className='m-0 description'>Can be Life Threatening</p>
                        </div>
                    </div>
                </div>
                {/* LEVEL 4 */}
                <div className={`forLvl four d-flex mt-3 ${filterLvlActive === '4' ? 'active' : ''}`} onClick={() => handleFilterLevel('4')}>
                    <div className='lvl-logo four w-25'>
                        <p className='m-0'>IMM</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-2'>
                            <p className='m-0 highlight four'>IMMEDIATE</p>
                            <p className='m-0 description'>Life Threatening</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HistoryFilters