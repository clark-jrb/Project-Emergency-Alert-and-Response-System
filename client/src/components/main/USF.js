import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard"
import Emergencies from "../Emergencies"
import Messages from "../Messages"
import Map from "../Map"
import History from "../History"
import Settings from "../Settings"
import NavBar from "../NavBar"

const USF = () => {
    return (
        <div className="usf-container">
            <NavBar/>
            <div className="content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard/>}></Route>
                    <Route path="emergencies" element={<Emergencies/>}></Route>
                    <Route path="messages" element={<Messages/>}></Route>
                    <Route path="map" element={<Map/>}></Route>
                    <Route path="history" element={<History/>}></Route>
                    <Route path="settings" element={<Settings/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default USF