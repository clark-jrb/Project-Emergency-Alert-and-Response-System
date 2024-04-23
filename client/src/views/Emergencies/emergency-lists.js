import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import New from './requests-new'
import Ongoing from './requests-ongoing'
import Complete from './requests-complete'
import { useFilterListContext } from '../../context/FilterListContext'
import { useAuth } from '../../context/AuthContext'
import { useOngoingArray } from '../../context/OngoingArray'
import { useUsersContext } from '../../context/UsersContext'
import { collection, updateDoc, doc, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../firebase'

const Emergency_lists = () => {
    const { ongoingArray } = useOngoingArray()
    const { currentUserRole } = useAuth()
    const { admins } = useUsersContext()
    const { activeFilter, setTheFilter } = useFilterListContext()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    const findAdmin = admins.find(admin => admin.route === currentUserRole)
    const [limit, setLimit] = useState(findAdmin.available)

    const handleClick = (component) => {
        setTheFilter(component)
    }

    const handleLimitChange = (event) => {
        // Update the state with the new value
        let newLimit = parseInt(event.target.value, 10);
        // make the number above max into max number
        newLimit = Math.min(Math.max(newLimit, 1), 50);
        setLimit(isNaN(newLimit) ? 1 : newLimit);
    };

    const handleSetLimit = async () => {
        const adminsCollection = collection(db, `response_team`)

        const specAdmin = doc(adminsCollection, findAdmin.id)
        updateDoc(specAdmin, {
            available: limit
        })
        // console.log(limit);

        const requestCollection = collection(db, `alert_${findAdmin.route}`);
        const querySnapshot = await getDocs(query(requestCollection, where("status", "==", "Inqueue")))

        let vacant = ongoingArray.findIndex(element => element === undefined)
        const docsToUpdate = querySnapshot.docs.slice(0, vacant + 2);

        // console.log("vacant: ", Math.abs(vacant));
        // console.log("docs that has inqueue: ", docsToUpdate);

        for (const docToUpdate of docsToUpdate) {
            const specReq = doc(requestCollection, docToUpdate.id);

            // Update the document to have status 'Ongoing'
            await updateDoc(specReq, {
                status: 'Ongoing'
            });

            // Uncomment the line below if you want to log the result
            // console.log(`Document with ID ${docToUpdate.id} updated to "Ongoing"`);
        }

        // if (docsToUpdate.length > 0) {
            // Uncomment the line below if you want to log the result
            // console.log(`${docsToUpdate.length} document(s) with status "Inqueue" updated to "Ongoing"`);
        // } else {
            // Uncomment the line below if you want to log the result
            // console.log('No document with status "Inqueue" found');
        // }
    }

    useEffect(() => {
        // Check if limit is the same of available responders
        setIsButtonDisabled(limit === findAdmin.available);
    }, [limit, findAdmin.available]);

    // console.log(limit);

    return (
        <div className='emer-lists p-4 m-0'>
            <div className='filters d-flex p-2'>
                <div className={`new flex-fill p-2 py-2 ${activeFilter === 'New' ? 'active' : ''}`} onClick={() => handleClick('New')}>
                    <h6>New</h6>
                </div>
                <div className={`ongoing flex-fill p-2 py-2 ${activeFilter === 'Ongoing' ? 'active' : ''}`} onClick={() => handleClick('Ongoing')}>
                    <h6>Ongoing</h6>
                </div>
                <div className={`completed flex-fill p-2 py-2 ${activeFilter === 'Complete' ? 'active' : ''}`} onClick={() => handleClick('Complete')}>
                    <h6>Completed</h6>
                </div>
            </div>
            <div className='set-limit p-2 d-flex'>
                <div className='set-limit-title d-flex'>Set available &#40;max of 50&#41;</div>
                <div className='input-limit-con'>
                    <input type='number' min='1' max='50' className='input-limit px-2 py-1' onChange={handleLimitChange} value={limit}></input>
                </div>
                <div className='set-limit-button-con'>
                    <button onClick={handleSetLimit} className='set-limit-button px-2 py-1' disabled={isButtonDisabled}>SET</button>
                </div>
            </div>
            <div className='requests d-flex '>
                {activeFilter === 'New' && <New />}
                {activeFilter === 'Ongoing' && <Ongoing />}                
                {activeFilter === 'Complete' && <Complete />}
            </div>
        </div>
    )
}

export default Emergency_lists