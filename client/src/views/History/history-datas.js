import React, { useState } from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestsFilterContext } from '../../context/RequestsFilterContext'

const HistoryDatas = () => {
    const { levelFilter, statusFilter, monthFilter, yearFilter } = useRequestsFilterContext()
    const { requests } = useRequestContext()
    const [currentPage, setCurrentPage] = useState(1)
    const [ascending, setAscending] = useState(false)
    const itemsPerPage = 10

    // Pagination 
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }
    
    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    const filteredRequests = currentRequests.filter((data) => {
        // Apply filters based on state variables

        const levelMatch = !levelFilter | data.emergency_level === levelFilter
        const statusMatch = !statusFilter | data.status === statusFilter | data.status === 'Declined'
        const dateMatch = !monthFilter | data.date.includes(monthFilter)
        const yearMatch = !yearFilter | data.date.includes(yearFilter)
    
        // Return true if all filters match
        return levelMatch && statusMatch && dateMatch && yearMatch
    })

    const toggleSortOrder = () => {
        setAscending((prevAscending) => !prevAscending)
    }

    const sortedRequests = [...filteredRequests].sort((a, b) => {
        const sortOrder = ascending ? 1 : -1
        return sortOrder * (b.request_no - a.request_no)
    })

    return (
        <div className='history-datas p-4'>
            <div className='datas-title px-3 mb-3'>
                <p className='m-0'>Emergency Records</p>
            </div>
            <div className='datas-table px-3'>
                <table>
                    <thead className='mb-2'>
                        <tr>
                            <th className='table-num-h px-1' onClick={toggleSortOrder}>
                                # <i className="fa-solid fa-sort" style={{fontSize: 'x-small'}}/>
                            </th>
                            <th className='table-level'>Level</th>
                            <th className='table-date'>Date</th>
                            <th className='table-time'>Time</th>
                            <th className='table-ET'>Emergency Type</th>
                            <th className='table-user'>User ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRequests.map((data) => (
                            <tr key={data.id} className='tr-table'>
                                <td className='table-num px-1'>{data.request_no}</td>
                                <td className='table-level td-level px-2'>
                                    <div className={`td-level-con py-1 
                                        ${data.emergency_level === '1' ? 
                                            "blue" : data.emergency_level === '2' ? 
                                            "green" : data.emergency_level === '3' ? 
                                            "yellow" : data.emergency_level === '4' ? 
                                            "red" : "N/A"
                                        }`}>
                                        {data.emergency_level === '1' ? 
                                            "L1" : data.emergency_level === '2' ? 
                                            "L2" : data.emergency_level === '3' ? 
                                            "URG" : data.emergency_level === '4' ? 
                                            "IMM" : "N/A"
                                        }
                                    </div>
                                </td>
                                <td className='table-date'>{data.date}</td>
                                <td className='table-time'>{moment(data.timestamp).format('LT')}</td>
                                <td className='table-ET'>{data.emergency_type}</td>
                                <td className='userID-text px-3'>{data.userID}</td>
                                <td className={`data-status 
                                    ${data.status === 'Complete' ? 'ds-complete' : 
                                        data.status === 'Declined' ? 'ds-declined' : 'ds-na'}`}
                                >
                                    {data.status === 'Complete' ? 
                                        <>
                                        <i className="fa-regular fa-circle-check"></i> {data.status}
                                        </> : data.status === 'Declined' ? 
                                        <> 
                                        <i className="fa-solid fa-xmark"></i> {data.status}
                                        </> : 'N/A'
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className='pagination py-2'>
                    <button className={`prev-btn px-2 ${currentPage === 1 ? 'disabled' : ''}`} onClick={prevPage} disabled={currentPage === 1}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    {Array.from({ length: Math.ceil(requests.length / itemsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className={`num-btn px-2 ${currentPage === index + 1 ? 'active' : ''}`}>
                            {index + 1}
                        </button>
                    ))}

                    <button 
                        className={`next-btn px-2 ${currentPage === Math.ceil(requests.length / itemsPerPage) ? 'disabled' : ''}`} 
                        onClick={nextPage} 
                        disabled={currentPage === Math.ceil(requests.length / itemsPerPage)}
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HistoryDatas