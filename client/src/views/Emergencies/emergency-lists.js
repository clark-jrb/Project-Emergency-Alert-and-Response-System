import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import New from './requests-new'
import Ongoing from './requests-ongoing'
import Complete from './requests-complete'
import { useFilterListContext } from '../../context/FilterListContext'

const Emergency_lists = () => {
    const { activeFilter, setTheFilter } = useFilterListContext()

    const handleClick = (component) => {
        setTheFilter(component)
    }

    return (
        <div className='emer-lists p-3 m-0'>
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
            <div className='requests d-flex mt-3'>
                {activeFilter === 'New' && <New />}
                {activeFilter === 'Ongoing' && <Ongoing />}
                {activeFilter === 'Complete' && <Complete />}
            </div>
        </div>
    )
}

export default Emergency_lists