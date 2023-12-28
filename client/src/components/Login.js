import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('Sign-in successful')
            navigate('/dashboard')
        } catch (error) {
            console.error('Error signing in:', error.message)
        }
    };

    return (
        <div className='container login-con'>
            <div className='container login-form border p-3'>
                <div className='loginTitle m-3'>
                    <h2>Log In</h2>
                </div>

                <div className='forEmail m-3'>
                    <input className='form-control' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div className='forPass m-3'>
                    <input className='form-control' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            
                <div className='forBtn m-3'>
                    <button className='btn btn-success' onClick={handleLogin}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Login
