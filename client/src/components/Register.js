import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/login.css'
import { useUsersContext } from '../context/UsersContext'
import { useActiveContext } from '../context/ActiveContext'
import { Form } from 'react-bootstrap' 
// import badge from '../images/logo/badge.png'
// import redcross from '../images/logo/redcross.png'

const Register = () => {
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

    return (
        <div className='reg-con'>
            <form className='reg-form p-3' onSubmit={handleLogin}>
                <div className='regTitle m-3'>
                    <span style={{ color: 'var(--green)' }}>
                        <h2 style={{ fontWeight: 'bold' }}>Hello responders!</h2>
                    </span>
                    <p className='m-0' style={{ fontSize: 'medium' }}>Please register according to your role</p>
                </div>

                <div className="forRole m-3">
                    <label htmlFor="role">Role:</label>
                    <Form.Select
                        id="role"
                        type="text"
                        name="role"
                        className="p-2 px-3"
                        // value={data.gender}
                        // onChange={(e) => handleChange(e)}
                    >
                        <option disabled selected value="">Role</option>
                        <option value="usf" >USF</option>
                        <option value="infirmary">Infirmary</option>
                    </Form.Select>
                </div>

                <div className='forEmail m-3'>
                    <label htmlFor="email">Email:</label>
                    <input id="email" className='input-email p-2 px-3' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                {error && <div className='error-cont m-3 p-1 px-3' style={{ color: 'var(--red)' }}>{error}</div>}
                
                <div className='forPass m-3'>
                    <label htmlFor="pass">Password:</label>
                    <input id="pass" className='input-pass p-2 px-3' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            
                <div className='forBtn m-3'>
                    <button className='reg-btn w-100 p-2' type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register