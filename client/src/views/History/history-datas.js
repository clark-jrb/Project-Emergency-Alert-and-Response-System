import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'

const HistoryDatas = () => {
    const { requests } = useRequestContext()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

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

    return (
        <div className='history-datas p-3'>
            <div className='datas-title px-2 mb-3'>
                <p className='m-0'>Emergency Records</p>
            </div>
            <div className='datas-table border'>
                <table>
                    <thead>
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
                        {currentRequests.map((data) => (
                            <tr key={data.id}>
                                <td className='table-num px-1'>{data.req_no}</td>
                                <td className='table-level td-level px-2'>
                                    <div className='td-level-con py-1'>
                                        {data.emergency_level}
                                    </div>
                                </td>
                                <td className='table-date'>{data.date}</td>
                                <td className='table-time'>{data.time}</td>
                                <td className='table-ET'>{data.emergency_type}</td>
                                <td className='userID-text px-3'>{data.userID}</td>
                                <td>{data.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>

                    {Array.from({ length: Math.ceil(requests.length / itemsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`px-2 ${currentPage === index + 1 ? 'active' : ''}`}>
                        {index + 1}
                    </button>
                    ))}

                    <button onClick={nextPage} disabled={currentPage === Math.ceil(requests.length / itemsPerPage)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HistoryDatas