import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard"
import Emergencies from "../Emergencies"
import Messages from "../Messages"
import Map from "../Map"
import History from "../History"
import NavBar from "../NavBar"
import Logs from "../Logs"
import { NavActiveProvider } from "../../context/NavActiveContext"
import { RequestProvider } from "../../context/RequestContext"
import { MessageProvider } from "../../context/MessagesContext"
import { LocateProvider } from "../../context/LocateContext"
import { LogsProvider } from "../../context/LogsContext"
import clsu_logo_nav from '../../images/logo/clsu_logo_nav.png'
// import { useActiveContext } from "../../context/ActiveContext"

const Infirmary = () => {
    // const { active } = useActiveContext()

    // useEffect(() => {
    //     console.log('active request: ' + active);
    // }, [active]);

    return (
        <div className="infi-container">
            <RequestProvider>
                <MessageProvider>
                    <NavActiveProvider>
                        <LogsProvider>
                            <NavBar logo={clsu_logo_nav}/>
                            <LocateProvider>
                                <div className="content">
                                    <Routes>
                                        <Route path="dashboard" element={<Dashboard/>}></Route>
                                        <Route path="emergencies" element={<Emergencies/>}></Route>
                                        <Route path="messages" element={<Messages/>}></Route>
                                        <Route path="map" element={<Map/>}></Route>
                                        <Route path="history" element={<History/>}></Route>
                                        <Route path="logs" element={<Logs/>}></Route>
                                    </Routes>
                                </div>
                            </LocateProvider>
                        </LogsProvider>
                    </NavActiveProvider>
                </MessageProvider>
            </RequestProvider>
        </div>
    )
}

export default Infirmary