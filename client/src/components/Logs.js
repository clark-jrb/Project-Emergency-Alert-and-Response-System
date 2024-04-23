import React from 'react';
import '../styles/logs.css'

const Logs = () => {
    return (
        <div className='user-logs-content p-4'>
            <div className="user-logs p-4">
                <div className="ul-title px-3 mb-3">
                    User Logs
                </div>
                <div className="user-log-table px-3">
                This is user logs

                </div>
            </div>
        </div>
    )
}

export default React.memo(Logs)