import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, where, query, getDocs, doc as firebaseDoc, updateDoc } from 'firebase/firestore'
import '../styles/login.css'
import { useUsersContext } from '../context/UsersContext'
import { logUserAction } from '../utils/LogsAction'

const Login = () => {
    const { admins } = useUsersContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            // console.log(email)

            // console.log(rtUserDoc);
            const querySnapshot = await getDocs(query(collection(db, 'rt_users'), where('email', '==', email)));
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userRole = userData.role;
                // console.log(userData);
                const findAdmin = admins.find(admin => admin.route === userRole)
                // console.log(findAdmin.id);

                const rtCollection = collection(db, `response_team`)
                const specDoc = firebaseDoc(rtCollection, findAdmin.id)
                // console.log(specDoc);

                // Navigate based on the user's role
                if (userRole) {
                    updateDoc(specDoc, {
                        status: 'online'
                    })
                    console.log('welcome you are now online!');
                    logUserAction('sign_in', userData)
                    navigate(`/${userRole}/dashboard`);
                } else {
                    console.log('no role exist');
                }
            });
            
        } catch (error) {
            setError('Incorrect credentials')
            console.error('Error signing in:', error.message)
        }
    };

    return (
        <div className='login-con'>
            <form className='login-form p-3' onSubmit={handleLogin}>
                <div className='loginTitle m-3'>
                    <span style={{ color: 'var(--green)' }}>
                        <h2 style={{ fontWeight: 'bold' }}>Hello responders!</h2>
                    </span>
                    <p className='m-0' style={{ fontSize: 'medium' }}>Please login according to your role below</p>
                </div>

                <div className='forEmail mx-3 py-2'>
                    <label htmlFor="email">Email:</label>
                    <input className='input-email p-2 px-3' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div className='forPass mx-3 py-2'>
                    <label htmlFor="pass">Password:</label>
                    <input className='input-pass p-2 px-3' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && 
                    <div className='error-cont m-3 p-1 px-3' style={{ color: 'var(--red)' }}>
                        {error}
                    </div>
                }
            
                <div className='forBtn mx-3 py-2 pt-4'>
                    <button className='login-btn w-100 p-2' type='submit'>Log In</button>
                </div>
            </form>
        </div>
        
    )
}

export default Login
