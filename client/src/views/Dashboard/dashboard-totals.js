import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Siren from '../../images/logo/siren.png'
import Ongoing from '../../images/logo/ongoing.png'
import Cancel from  '../../images/logo/cancel.png'
import Checked from '../../images/logo/checked.png'
import moment from 'moment'
import { useNavActiveContext } from '../../context/NavActiveContext'
import { useActiveContext } from '../../context/ActiveContext'
import { useLocateContext } from '../../context/LocateContext'

const DashboardTotals = ({ requests, currentUserRole, admins }) => {
    const { setTheNav } = useNavActiveContext()
    const { setTheActive } = useActiveContext()
    const { setLocation } = useLocateContext()
    const [ascending, setAscending] = useState(true)
    const navigate = useNavigate()

    let totalRequest = requests.length
    let completedRequest = requests.filter(request => request.status === 'Complete').length
    let ongoingRequest = requests.filter(request => request.status === 'Ongoing').length
    let canceledRequest = requests.filter(request => request.status === 'Declined').length

    const currentAdmin = admins.find(admin => admin.route === currentUserRole)

    const getLvlTotals = (lvl) => {
        let lvlTotal = requests.filter(request => request.emergency_level === lvl).length
        return lvlTotal
    }

    const handleDetailsBtn = (e) => {
        navigate(`/${currentAdmin.route}/emergencies`)
        setTheActive(e)
        setTheNav('emergencies')
    }

    const handleLocateBtn = (e) => {
        setLocation(e)
        navigate(`/${currentAdmin.route}/map`)
    }

    const toggleSortOrder = () => {
        setAscending((prevAscending) => !prevAscending)
    }

    const sortedRequests = [...requests].sort((a, b) => {
        const sortOrder = ascending ? 1 : -1
        return sortOrder * (b.request_no - a.request_no)
    })

    return (
        <div className='forContent d-flex'>

            <div className='totals-section d-flex px-4 h-25'>
                <div className='total-emergency d-flex p-4 justify-content-center'>
                    <div className="d-flex gap-2">
                        <div className='total-icon'>
                            <img src={Siren} alt='siren-logo'/>
                        </div>
                        <div className='total-title'>
                            <div className='flex-fill'>
                                <p className='m-0 total-count'>{totalRequest}</p>
                                <p className='m-0'>Total Emergencies</p>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='total-ongoing d-flex p-4 justify-content-center'>
                    <div className="d-flex gap-2">
                        <div className='total-icon'>
                            <img src={Ongoing} alt='ongoing-logo'/>
                        </div>
                        <div className='total-title'>
                            <div className='flex-fill'>
                                <p className='m-0 total-count'>{ongoingRequest}</p>
                                <p className='m-0'>Total On Going</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='total-complete d-flex p-4 justify-content-center'>
                    <div className="d-flex gap-2">
                        <div className='total-icon'>
                            <img src={Checked} alt='checked-logo'/>
                        </div>
                        <div className='total-title'>
                            <div className='flex-fill'>
                                <p className='m-0 total-count'>{completedRequest}</p>
                                <p className='m-0'>Total Completed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='total-canceled d-flex p-4'>
                    <div className='total-icon'>
                        <img src={Cancel} alt='cancel-logo'/>
                    </div>
                    <div className='total-title'>
                        <div>
                            <p className='m-0 total-count'>{canceledRequest}</p>
                            <p className='m-0'>Total Canceled</p>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className='history-section d-flex px-4 pt-4 h-75'>
                <div className='today-requests d-flex w-75'>
                    <div className='today-request-title-date'>
                        <p className=''>Today's Emergencies » <span style={{fontWeight: "bold", fontSize: "large"}}>{moment().format('LL')}</span></p>
                    </div>

                    <div className='today-request-table'>
                        <table className='the-table'>
                            <thead className='mb-1'>
                                <tr>
                                    <th className='table-num-h px-1' onClick={toggleSortOrder}>
                                        # <i className="fa-solid fa-sort" style={{fontSize: 'x-small'}}/>
                                    </th>
                                    <th className='table-level'>Level</th>
                                    <th className='table-time-dash'>Time</th>
                                    <th className='table-ET-dash'>Emergency Type</th>
                                    <th className='data-status-dash'>Status</th>
                                    <th className='table-actions'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody'>
                                {sortedRequests.map((data) => (
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
                                                {data.emergency_level === '1' ? 
                                                    "L1" : data.emergency_level === '2' ? 
                                                    "L2" : data.emergency_level === '3' ? 
                                                    "URG" : data.emergency_level === '4' ? 
                                                    "IMM" : "N/A"
                                                }
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
                                                </> : data.status === 'Cancelled' ?
                                                <>
                                                    <span style={{ color: "var(--red)"}}>
                                                        <i className="fa-solid fa-xmark"></i> {data.status}
                                                    </span>
                                                </> : <></>
                                            }
                                        </td>
                                        <td className='table-actions'>
                                            {data.status === 'New' || data.status === 'Ongoing' || data.status === 'Inqueue' ? 
                                                <>
                                                    <button className='go-to-details p-1 px-2 mx-1' onClick={() => handleDetailsBtn(data.id)}>
                                                        Details
                                                    </button>
                                                    <button className='go-to-location p-1 px-2 mx-1' onClick={() => handleLocateBtn(data.location)}>Locate</button>
                                                </> : 
                                                <>
                                                </>}
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
                            {/* <div className='totals-lvl4-logo d-flex'>
                                <p className='m-0'>L4</p>
                            </div> */}
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
                            {/* <div className='totals-lvl3-logo d-flex'>
                                <p className='m-0'>L3</p>
                            </div> */}
                            <div className='totals-lvl3-desc px-2'>
                                <p className='m-0 lvl-desc'>Total</p>
                                <p className='m-0'>Urgent</p>
                            </div>
                        </div>
                        
                        <div className='totals-lvl3-count px-3'>
                            <p className='m-0'>{getLvlTotals('3')}</p>
                        </div>
                    </div>

                    {/* <div className='totals-lvl2 p-2 d-flex'>
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default DashboardTotals