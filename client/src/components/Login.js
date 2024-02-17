import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/login.css'
import { useUsersContext } from '../context/UsersContext'

const Login = () => {
    const { admins } = useUsersContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const findEmail = admins.find(admin => admin.email === email)

    // console.log(findEmail);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('Sign-in successful')

            if (findEmail) {
                navigate(`/${findEmail.route}/dashboard`)
            }
            
        } catch (error) {
            setError('Incorrect credentials')
            console.error('Error signing in:', error.message)
        }
    };

    return (
        <div className='container login-con'>
            <div className='container login-form border p-3'>
                <div className='loginTitle m-3'>
                    <h2>Log In</h2>
                </div>

                {error && <div className='m-3' style={{ color: 'red' }}>{error}</div>}

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
