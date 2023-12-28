import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Emergencies from './components/Emergencies'
import Login from './components/Login'
import Register from './components/Register'
import { AuthProvider } from './context/AuthContext'
// import PrivateRoute from './utils/PrivateRoute'

const Router = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/dashboard" element={<Dashboard/>}/>
                <Route exact path="/emergencies" element={<Emergencies/>}/>
            </Routes>
        </AuthProvider>
    )
}

export default Router;
