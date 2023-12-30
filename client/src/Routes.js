import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import USF from './components/main/USF';
import Infirmary from './components/main/Infirmary';
// import PrivateRoute from './utils/PrivateRoute'

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="usf/*" element={<USF/>}/>
            <Route exact path="infirmary/*" element={<Infirmary/>}/>
        </Routes>
    )
}

export default Router;
