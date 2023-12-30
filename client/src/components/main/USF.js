import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard"
import Emergencies from "../Emergencies"
import NavBar from "../NavBar"

const USF = () => {
    return (
        <div className="usf-container">
            <NavBar/>
            <div className="content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard/>}></Route>
                    <Route path="emergencies" element={<Emergencies/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default USF