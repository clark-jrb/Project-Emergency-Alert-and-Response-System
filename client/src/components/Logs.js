import React from 'react';
import '../styles/logs.css'
import { useLogsContext } from '../context/LogsContext';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';

const Logs = () => {
    const { logs } = useLogsContext()
    const { currentUserRole } = useAuth()

    return (
        <div className='user-logs-content p-4'>
            <div className="user-logs p-4">
                <div className="ul-title px-3 mb-3">
                    User Logs
                </div>
                <div className="user-log-table px-3">
                    <table>
                        <thead className='mb-2'>
                            <tr>
                                <th className='table-num-h px-1'>#</th>
                                <th className='table-level'>Session</th>
                                <th className='table-date'>Date & Time</th>
                                <th className='table-time'>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs
                                .filter(log => log.role === currentUserRole)
                                .map((log, index) => (
                                <tr key={index + 1}>
                                    <td className='table-num px-1'>{index + 1}</td>
                                    <td className='table-level' id={`${log.action}`}>{log.action}</td>
                                    <td className='table-date'>{moment(log.timestamp).format('llll')}</td>
                                    <td className='table-time'>{log.displayName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Logs)