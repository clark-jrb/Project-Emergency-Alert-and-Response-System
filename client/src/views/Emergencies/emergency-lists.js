import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import New from './requests-new'
import Ongoing from './requests-ongoing'
import Complete from './requests-complete'
import { useFilterListContext } from '../../context/FilterListContext'

const Emergency_lists = () => {
    const { activeFilter, setTheFilter } = useFilterListContext()
    const [limit, setLimit] = useState(1)

    const handleClick = (component) => {
        setTheFilter(component)
    }

    const handleLimitChange = (event) => {
        // Update the state with the new value
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit);
        console.log(limit);
    };

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
            <div className='set-limit mt-3 d-flex'>
                <div className='set-limit-title d-flex'>Set limit &#40;max of 10&#41;</div>
                <div className='input-limit-con'>
                    <input type='number' min="1" max="10" className='input-limit px-2 py-1' value={limit} onChange={handleLimitChange}></input>
                </div>
            </div>
            <div className='requests d-flex mt-3'>
                {activeFilter === 'New' && <New />}
                {activeFilter === 'Ongoing' && <Ongoing />}
                {activeFilter === 'Complete' && <Complete />}
            </div>
        </div>
    )
}

export default Emergency_lists