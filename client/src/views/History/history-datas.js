import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'
import { useRequestsFilterContext } from '../../context/RequestsFilterContext'

const HistoryDatas = () => {
    const { levelFilter, statusFilter, monthFilter, yearFilter } = useRequestsFilterContext()
    const { requests } = useRequestContext()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Pagination 
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    
    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const filteredRequests = currentRequests.filter((data) => {
        // Apply filters based on state variables

        const levelMatch = !levelFilter || data.emergency_level === levelFilter
        const statusMatch = !statusFilter || data.status === statusFilter
        const dateMatch = !monthFilter || data.date.includes(monthFilter)
        const yearMatch = !yearFilter || data.date.includes(yearFilter)
    
        // Return true if all filters match
        return levelMatch && statusMatch && dateMatch && yearMatch
    })

    return (
        <div className='history-datas p-3'>
            <div className='datas-title px-3 mb-3'>
                <p className='m-0'>Emergency Records</p>
            </div>
            <div className='datas-table px-3'>
                <table>
                    <thead className='mb-2'>
                        <tr>
                            <th className='table-num px-1'>#</th>
                            <th className='table-level'>Level</th>
                            <th className='table-date'>Date</th>
                            <th className='table-time'>Time</th>
                            <th className='table-ET'>Emergency Type</th>
                            <th className='table-user'>User ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((data) => (
                            <tr key={data.id} className='tr-table'>
                                <td className='table-num px-1'>{data.req_no}</td>
                                <td className='table-level td-level px-2'>
                                    <div className={`td-level-con py-1 
                                        ${data.emergency_level === '1' ? 
                                            "blue" : data.emergency_level === '2' ? 
                                            "green" : data.emergency_level === '3' ? 
                                            "yellow" : data.emergency_level === '4' ? 
                                            "red" : "N/A"
                                        }`}>
                                        L{data.emergency_level}
                                    </div>
                                </td>
                                <td className='table-date'>{data.date}</td>
                                <td className='table-time'>{data.time}</td>
                                <td className='table-ET'>{data.emergency_type}</td>
                                <td className='userID-text px-3'>{data.userID}</td>
                                <td className='data-status'><i className="fa-solid fa-check"></i> {data.status}</td>
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