import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import New from './requests-new'
import Ongoing from './requests-ongoing'
import Complete from './requests-complete'

const Emergency_lists = () => {
    const [selectedComponent, setSelectedComponent] = useState(null)

    const handleClick = (component) => {
        setSelectedComponent(component)
    }

    return (
        <div className='emer-lists p-3 m-0'>
            <div className='filters d-flex p-2'>
                <div className={`new flex-fill p-2 py-2 ${selectedComponent === 'New' ? 'active' : ''}`} onClick={() => handleClick('New')}>
                    <h6>New</h6>
                </div>
                <div className={`ongoing flex-fill p-2 py-2 ${selectedComponent === 'Ongoing' ? 'active' : ''}`} onClick={() => handleClick('Ongoing')}>
                    <h6>Ongoing</h6>
                </div>
                <div className={`completed flex-fill p-2 py-2 ${selectedComponent === 'Complete' ? 'active' : ''}`} onClick={() => handleClick('Complete')}>
                    <h6>Completed</h6>
                </div>
            </div>
            <div className='requests d-flex mt-3'>
                {selectedComponent === 'New' && <New />}
                {selectedComponent === 'Ongoing' && <Ongoing />}
                {selectedComponent === 'Complete' && <Complete />}
            </div>
        </div>
    )
}

export default Emergency_lists