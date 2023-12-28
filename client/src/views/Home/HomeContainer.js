import React from 'react'
import logo from '../Home/clsu_logo.png'
import { useNavigate } from 'react-router-dom'

const HomeContainer = () => {
    const navigate = useNavigate()
    
    const loginPage = () => {
        navigate('/login')
    }

    const registerPage = () => {
        navigate('/register')
    }

    return (
        <div className="container home-container">
            <div className="container logo-container border p-3">
                <div className="forLogo p-2">
                    <img src={logo} alt="logo-clsu"></img>
                </div>
                <div className="forTitle p-2">
                    <h3>CLSU <br/> Emergency Alert and Response System</h3>
                </div>
            </div>
            <div className="container form-container p-3">
                <div className="forLogin p-2">
                    <button className="btn btn-success login-btn" onClick={loginPage}>Login</button>
                </div>

                <div className="forRegister p-2">
                    <button className="btn btn-success reg-btn" onClick={registerPage}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default HomeContainer