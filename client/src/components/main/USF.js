import React, { Suspense } from "react"
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
import { UsersProvider } from "../../context/UsersContext"
import { MessageProvider } from "../../context/MessagesContext"
import { ActiveProvider } from "../../context/ActiveContext"
import Loading from '../Loading'

const USF = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <div className="usf-container">
                <UsersProvider>
                    <RequestProvider>
                        <MessageProvider>
                            <NavActiveProvider>
                                    <NavBar/>
                            </NavActiveProvider>
                        
                            <ActiveProvider>
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
                            </ActiveProvider>
                        </MessageProvider>
                    </RequestProvider>
                </UsersProvider>
            </div>
        </Suspense>
        
    )
}

export default USF