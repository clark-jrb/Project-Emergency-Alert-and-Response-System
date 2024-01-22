import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form } from 'react-bootstrap'

const HistoryFilters = () => {
    // State to manage the selected value
    const [month, setMonth] = useState('Month')
    const [year, setYear] = useState('Year')

    // Handler function to update the selected value
    const handleMonthChange  = (event) => {
        setMonth(event.target.value)
    }

    const handleYearChange  = (event) => {
        setYear(event.target.value)
    }

    // reset buttons

    const resetMonth = () => {
        setMonth('Month')
    }

    const resetYear = () => {
        setYear('Year')
    }

    // List of months for the dropdown
    const years = ['2023', '2024']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    

    return (
        <div className='history-filters'>
            <div className='sortByDate border p-3'>
                <div className='sort-title pt-2'>
                    <p className='m-0'>Sort by Date</p>
                </div>

                <div className='forMonth d-flex pt-3'>
                    <p className='m-0'>Month</p>
                    <Form.Select onChange={handleMonthChange} value={month}>
                        <option disabled>Month</option>
                        {/* Map through months and create option elements */}
                        {months.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </Form.Select>
                    <button className='btn btn-danger' onClick={resetMonth}>
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                    </button>
                </div>

                <div className='forYear d-flex pt-3'>
                    <p className='m-0'>Year</p>
                    <Form.Select onChange={handleYearChange} value={year}>
                        <option disabled>Year</option>
                        {/* Map through months and create option elements */}
                        {years.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </Form.Select>
                    <button className='btn btn-danger' onClick={resetYear}>
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                    </button>
                </div>

            </div>
            <div className='sortByLevel border p-3'>
                <div className='sort-title pt-2'>
                    <p className='m-0'>Level of Emergency</p>
                </div>
                {/* LEVEL 1 */}
                <div className='forLvl one d-flex mt-3'>
                    <div className='lvl-logo one w-25'>
                        <p className='m-0'>L1</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-3'>
                            <p className='m-0'>NON-URGENT</p>
                            <p className='m-0'>Lorem</p>
                        </div>
                    </div>
                </div>
                {/* LEVEL 2 */}
                <div className='forLvl two d-flex mt-3'>
                    <div className='lvl-logo two w-25'>
                        <p className='m-0'>L2</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-3'>
                            <p className='m-0'>SEMI-URGENT</p>
                            <p className='m-0'>Lorem</p>
                        </div>
                    </div>
                </div>
                {/* LEVEL 3 */}
                <div className='forLvl three d-flex mt-3'>
                    <div className='lvl-logo three w-25'>
                        <p className='m-0'>L3</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-3'>
                            <p className='m-0'>URGENT</p>
                            <p className='m-0'>Lorem</p>
                        </div>
                    </div>
                </div>
                {/* LEVEL 4 */}
                <div className='forLvl four d-flex mt-3'>
                    <div className='lvl-logo four w-25'>
                        <p className='m-0'>L4</p>
                    </div>
                    <div className='lvl-info w-75'>
                        <div className='px-3'>
                            <p className='m-0'>IMMEDIATE</p>
                            <p className='m-0'>Lorem</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HistoryFilters