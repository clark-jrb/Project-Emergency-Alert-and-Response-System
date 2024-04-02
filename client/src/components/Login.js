import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/login.css'
import { useUsersContext } from '../context/UsersContext'
import { useActiveContext } from '../context/ActiveContext'
import badge from '../images/logo/badge.png'
import redcross from '../images/logo/redcross.png'

const Login = () => {
    const { admins } = useUsersContext()
    const { activeAdmin, setTheActiveAdmin } = useActiveContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const findEmail = admins.find(admin => admin.email === email)

    // console.log(findEmail);

    const handleLogin = async (e) => {
        e.preventDefault()
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
            <form className='login-form p-3' onSubmit={handleLogin}>
                <div className='loginTitle m-3'>
                    <span style={{ color: 'var(--green)' }}>
                        <h2 style={{ fontWeight: 'bold' }}>Hello responders!</h2>
                    </span>
                    <p className='m-0' style={{ fontSize: 'medium' }}>Please login according to your role below</p>
                </div>

                {/* <div className='forEmail m-3'>
                    <input className='form-control' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div> */}

                <div className='pick-responder d-flex mx-3 py-3'>

                    <div className='pick-usf w-50'>
                        <div 
                            className={`pick-usf-logo d-flex p-4 ${activeAdmin === 'usf@example.com' ? 'active' : ''}`} 
                            onClick={() => {handleAdmin('usf@example.com')}}
                        >
                            <img src={badge} alt='sekyu-logo'></img>
                        </div>
                        <div className='pick-usf-title py-2'>
                            <p className='m-0'>University Security Force</p>
                        </div>
                    </div>

                    <div className='line'></div>

                    <div className='pick-infi w-50'>
                        <div 
                            className={`pick-infi-logo d-flex p-4 ${activeAdmin === 'infirmary@example.com' ? 'active' : ''}`} 
                            onClick={() => {handleAdmin('infirmary@example.com')}}
                        >
                            <img src={redcross} alt='doktor-logo'></img>
                        </div>
                        <div className='pick-infi-title py-2'>
                            <p className='m-0'>University Infirmary</p>
                        </div>
                    </div>

                </div>

                {error && <div className='error-cont m-3 p-1 px-3' style={{ color: 'var(--red)' }}>{error}</div>}
                
                <div className='forPass m-3'>
                    <input className='input-pass p-2 px-3' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            
                <div className='forBtn m-3'>
                    <button className='login-btn w-100 p-2' type='submit'>Log In</button>
                </div>
            </form>
        </div>
        
    )
}

export default Login
