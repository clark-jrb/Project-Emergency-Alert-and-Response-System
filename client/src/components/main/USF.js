import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard"
import Emergencies from "../Emergencies"
import Messages from "../Messages"
import Map from "../Map"
import History from "../History"
import Settings from "../Settings"
import NavBar from "../NavBar"
import { NavActiveProvider } from "../../context/NavActiveContext"
import { RequestProvider } from "../../context/RequestContext"
import { MessageProvider } from "../../context/MessagesContext"
import { LocateProvider } from "../../context/LocateContext"
import trylang from '../../images/logo/clsu_logo_nav.png'

const USF = () => {
    return (
            <div className="usf-container">
                <RequestProvider>
                    <MessageProvider>
                        <NavActiveProvider>
                                <NavBar logo={trylang}/>
                                    <LocateProvider>
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
                                    </LocateProvider>
                        </NavActiveProvider>
                    </MessageProvider>
                </RequestProvider>
            </div>
    )
}

export default USF