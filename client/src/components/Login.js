import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/login.css'
import { useUsersContext } from '../context/UsersContext'
import { useActiveContext } from '../context/ActiveContext'
import doktor from '../images/logo/doktor.png'
import sekyu from '../images/logo/sekyu.png'

const Login = () => {
    const { admins } = useUsersContext()
    const { activeAdmin, setTheActiveAdmin } = useActiveContext()
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

            setTheActiveAdmin('')
            
        } catch (error) {
            setError('Incorrect credentials')
            console.error('Error signing in:', error.message)
        }
    };

    const handleAdmin = (e) => {
        setEmail(e)
        setTheActiveAdmin(e)
    }

    // console.log(email);

    return (
        <div className='login-con'>
            <div className='login-form p-3'>
                <div className='loginTitle m-3'>
                    <h2>Log in as</h2>
                </div>

                {error && <div className='m-3' style={{ color: 'red' }}>{error}</div>}

                {/* <div className='forEmail m-3'>
                    <input className='form-control' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div> */}

                <div className='pick-responder d-flex m-3'>

                    <div className='pick-usf w-50'>
                        <div className='pick-usf-title'>
                            <p className='m-0'>USF</p>
                        </div>
                        <div 
                            className={`pick-usf-logo d-flex ${activeAdmin === 'usf@example.com' ? 'active' : ''}`} 
                            onClick={() => {handleAdmin('usf@example.com')}}
                        >
                            <img src={sekyu} alt='sekyu-logo'></img>
                        </div>
                    </div>

                    <div className='pick-infi w-50'>
                        <div className='pick-infi-title'>
                            <p className='m-0'>Infirmary</p>
                        </div>
                        <div 
                            className={`pick-infi-logo d-flex ${activeAdmin === 'infirmary@example.com' ? 'active' : ''}`} 
                            onClick={() => {handleAdmin('infirmary@example.com')}}
                        >
                            <img src={doktor} alt='doktor-logo'></img>
                        </div>
                    </div>

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
