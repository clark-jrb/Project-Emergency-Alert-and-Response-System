import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import '../styles/login.css'
import { Form } from 'react-bootstrap' 

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            if (selectedRole !== '' && email !== '' && password !== '') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                await addDoc(collection(db, 'rt_users'), {
                    email: user.email,
                    role: selectedRole
                });
                
                console.log('User registered successfully');
                navigate(`/${selectedRole}/dashboard`); // Redirect to home page after registration
            } else {
                console.log('Please fill all the fields to proceed');
                setError('Please fill all the fields to proceed')

                setTimeout(() => {
                    setError(null); // Clear error after 5 seconds
                }, 3000);
            }
            
        } catch (error) {
            setError(error.message);
        }
    };


    // useEffect(() => {
    //     console.log(selectedRole);
    // }, [selectedRole]);

    return (
        <div className='reg-con'>
            <form className='reg-form p-3' onSubmit={handleRegister}>
                <div className='regTitle m-3'>
                    <span style={{ color: 'var(--green)' }}>
                        <h2 style={{ fontWeight: 'bold' }}>Hello responders!</h2>
                    </span>
                    <p className='m-0' style={{ fontSize: 'medium' }}>Please register according to your role</p>
                </div>

                <div className="forRole mx-3 py-2">
                    <label htmlFor="role">Role:</label>
                    <Form.Select
                        id="role"
                        type="text"
                        name="role"
                        className="p-2 px-3"
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option disabled value="">Role</option>
                        <option value="usf" >USF</option>
                        <option value="infirmary">Infirmary</option>
                    </Form.Select>
                </div>

                <div className='forEmail mx-3 py-2'>
                    <label htmlFor="email">Email:</label>
                    <input id="email" className='input-email p-2 px-3' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='forPass mx-3 py-2'>
                    <label htmlFor="pass">Password:</label>
                    <input id="pass" className='input-pass p-2 px-3' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && <div className='error-cont m-3 p-1 px-3' style={{ color: 'var(--red)' }}>{error}</div>}
            
                <div className='forBtn mx-3 py-2 pt-4'>
                    <button className='reg-btn w-100 p-2' type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register