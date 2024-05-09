import React, { useState } from 'react'
import { useFilterListContext } from '../../context/FilterListContext'
import moment from 'moment'
import { collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import sendNotification from '../../context/Notification'
import { Modal, Button } from 'react-bootstrap';

const CompleteButton = ({ reqID, adminRoute, adminName, reqType, token }) => {
    const { setTheFilter } = useFilterListContext()
    const setStatus = 'Complete'
    const currentDateTime = moment().format('LLLL')
    const [isLoading, setIsLoading] = useState(false)
    const { sendNotif } = sendNotification()

    const alertsCollection = collection(db, `alert_${adminRoute}`)
    const specReq = doc(alertsCollection, reqID)

    const setComplete = async () => {
        try {
            setIsLoading(true)

            updateDoc(specReq, {
                status: setStatus,
                time_completed: currentDateTime
            })

            const setQueueToOngoing = async () => {
        
                const querySnapshot = await getDocs(query(alertsCollection, where('status', '==', 'Inqueue')))

                if (querySnapshot.docs.length > 0) {
                    const firstDoc = querySnapshot.docs[0]
                    const specReq = doc(alertsCollection, firstDoc.id)
            
                    // Update the document to have status 'Ongoing'
                    await updateDoc(specReq, {
                        status: 'Ongoing'
                    })
            
                    // console.log('First document with status "Inqueue" updated to "Ongoing"')
                } else {
                    // console.log('No document with status "Inqueue" found')
                }
            }

            setQueueToOngoing()
            setTheFilter(setStatus)

            sendNotif({
                title: adminName + ' - ' + reqType,
                body: 'Request complete!',
                token: token
            })
            console.log('Request complete')
        } catch (error) {
            console.error('Error completing request:', error.message)
        }
    }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='ongoing-cont-status'>
            <div className='status-title'>
                <p className='mb-2'>Is the request completed?</p>
            </div>
            <button 
                className='complete-btn w-100 py-2'
                onClick={handleShow} 
                disabled={isLoading}
            >
                Complete
            </button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <div className='text-center'>
                        <p className='m-0'>Are you sure?</p>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer >
                    <div className='valid-modal-footer d-flex flex-fill gap-3'>
                        <button 
                            className='complete-btn py-2 w-50'
                            onClick={setComplete} 
                            disabled={isLoading}
                        >
                            Yes
                        </button>
                        <button className="no-btn w-50" onClick={handleClose}>
                            No
                        </button>
                    </div>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CompleteButton