import React from 'react';
import Siren from '../../images/logo/siren.png'
import Ongoing from '../../images/logo/ongoing.png'
import Cancel from  '../../images/logo/cancel.png'
import Checked from '../../images/logo/checked.png'
import moment from 'moment';

const DashboardTotals = ({ requests }) => {
    let totalRequest = requests.length;
    let completedRequest = requests.filter(request => request.status === 'Complete').length;
    let ongoingRequest = requests.filter(request => request.status === 'Ongoing').length;
    let canceledRequest = requests.filter(request => request.status === 'Declined').length;

    const getLvlTotals = (lvl) => {
        let lvlTotal = requests.filter(request => request.emergency_level === lvl).length;
        return lvlTotal
    }

    return (
        <div className='forContent d-flex'>

            <div className='totals-section d-flex px-4'>
                <div className='total-emergency d-flex p-4'>
                    <div className='total-icon'>
                        <img src={Siren} alt='siren-logo'/>
                    </div>
                    <div className='total-title'>
                        <p className='m-0 total-count'>{totalRequest}</p>
                        <p className='m-0'>Total Emergencies</p>
                    </div>
                </div>

                <div className='total-ongoing d-flex p-4'>
                    <div className='total-icon'>
                        <img src={Ongoing} alt='ongoing-logo'/>
                    </div>
                    <div className='total-title'>
                        <p className='m-0 total-count'>{ongoingRequest}</p>
                        <p className='m-0'>Total On Going</p>
                    </div>
                </div>

                <div className='total-complete d-flex p-4'>
                    <div className='total-icon'>
                        <img src={Checked} alt='checked-logo'/>
                    </div>
                    <div className='total-title'>
                        <p className='m-0 total-count'>{completedRequest}</p>
                        <p className='m-0'>Total Completed</p>
                    </div>
                </div>

                <div className='total-canceled d-flex p-4'>
                    <div className='total-icon'>
                        <img src={Cancel} alt='cancel-logo'/>
                    </div>
                    <div className='total-title'>
                        <p className='m-0 total-count'>{canceledRequest}</p>
                        <p className='m-0'>Total Canceled</p>
                    </div>
                </div>
            </div>

            <div className='history-section d-flex p-4'>
                <div className='today-requests w-75'>
                    <div className='today-request-title-date'>
                        <p className=''>Today's Emergencies » <span style={{fontWeight: "bold", fontSize: "large"}}>{moment().format('LL')}</span></p>
                    </div>

                    <div className='today-request-table'>
                        <table>
                            <thead className='mb-2'>
                                <tr>
                                    <th className='table-num px-1'>#</th>
                                    <th className='table-level'>Level</th>
                                    <th className='table-time-dash'>Time</th>
                                    <th className='table-ET-dash'>Emergency Type</th>
                                    <th className='data-status-dash'>Status</th>
                                    <th className='table-actions'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody'>
                                {requests.map((data) => (
                                    <tr key={data.id} className='tr-table tr-table-dash'>
                                        <td className='table-num px-1'>{data.request_no}</td>
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
                                        <td className='table-time-dash'>{moment(data.timestamp).format('LT')}</td>
                                        <td className='table-ET-dash'>{data.emergency_type}</td>
                                        <td className='data-status-dash'>
                                            {data.status === 'New' ? 
                                                <>
                                                    <span style={{ color: "var(--green)", fontWeight: "bold"}}>
                                                        {data.status}
                                                    </span>
                                                </> : data.status === 'Inqueue' ?
                                                <>
                                                    <span style={{ color: "var(--font-text)"}}>
                                                        <i className="fa-regular fa-clock"/> {data.status}
                                                    </span>
                                                </> : data.status === 'Ongoing' ?
                                                <>
                                                    <span style={{ color: "var(--font-text)"}}>
                                                        <i className="fa-solid fa-clock-rotate-left"/> {data.status}
                                                    </span>
                                                </> : data.status === 'Complete' ?
                                                <>
                                                    <span style={{ color: "var(--green)"}}>
                                                        <i className="fa-regular fa-circle-check"></i> {data.status}
                                                    </span>
                                                </> :
                                                <></>
                                            }
                                        </td>
                                        <td className='table-actions'>
                                            {data.status === 'New' || data.status === 'Ongoing' || data.status === 'Inqueue' ? 
                                                <>
                                                    <button className='go-to-details p-1 px-2 mx-1'>
                                                        Details
                                                    </button>
                                                    <button className='go-to-location p-1 px-2 mx-1'>Locate</button>
                                                </> : 
                                                <></>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='totals-per-level d-flex'>
                    <div className='totals-lvl4 p-2 d-flex'>
                        <div className='d-flex'>
                            <div className='totals-lvl4-logo d-flex'>
                                <p className='m-0'>L4</p>
                            </div>
                            <div className='totals-lvl4-desc px-2'>
                                <p className='m-0 lvl-desc'>Total</p>
                                <p className='m-0'>Immediate</p>
                            </div>
                        </div>
                        
                        <div className='totals-lvl4-count px-3'>
                            <p className='m-0'>{getLvlTotals('4')}</p>
                        </div>
                    </div>

                    <div className='totals-lvl3 p-2 d-flex'>
                        <div className='d-flex'>
                            <div className='totals-lvl3-logo d-flex'>
                                <p className='m-0'>L3</p>
                            </div>
                            <div className='totals-lvl3-desc px-2'>
                                <p className='m-0 lvl-desc'>Total</p>
                                <p className='m-0'>Urgent</p>
                            </div>
                        </div>
                        
                        <div className='totals-lvl3-count px-3'>
                            <p className='m-0'>{getLvlTotals('3')}</p>
                        </div>
                    </div>

                    <div className='totals-lvl2 p-2 d-flex'>
                        <div className='d-flex'>
                            <div className='totals-lvl2-logo d-flex'>
                                <p className='m-0'>L2</p>
                            </div>
                            <div className='totals-lvl2-desc px-2'>
                                <p className='m-0 lvl-desc'>Total</p>
                                <p className='m-0'>SEMI-Urgent</p>
                            </div>
                        </div>
                        
                        <div className='totals-lvl2-count px-3'>
                            <p className='m-0'>{getLvlTotals('2')}</p>
                        </div>
                    </div>

                    <div className='totals-lvl1 p-2 d-flex'>
                        <div className='d-flex'>
                            <div className='totals-lvl1-logo d-flex'>
                                <p className='m-0'>L1</p>
                            </div>
                            <div className='totals-lvl1-desc px-2'>
                                <p className='m-0 lvl-desc'>Total</p>
                                <p className='m-0'>NON-Urgent</p>
                            </div>
                        </div>
                        
                        <div className='totals-lvl1-count px-3'>
                            <p className='m-0'>{getLvlTotals('1')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTotals