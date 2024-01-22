import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRequestContext } from '../../context/RequestContext'

const HistoryDatas = () => {
    const { requests } = useRequestContext()

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
                        {requests.map((data) => (
                            <tr key={data.id}>
                                <td className='table-num px-1'>{data.req_no}</td>
                                <td className='table-level'>{data.emergency_level}</td>
                                <td className='table-date'>{data.date}</td>
                                <td className='table-time'>{data.time}</td>
                                <td className='table-ET'>{data.emergency_type}</td>
                                <td className='userID-text px-3'>{data.userID}</td>
                                <td>{data.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryDatas