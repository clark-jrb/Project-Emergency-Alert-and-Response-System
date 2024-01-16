import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
        const fetchUsers = async () => {
            try {
                // const response = await fetch('http://localhost:4000/users')
                const querySnapshot = await getDocs(collection(db, 'users'))
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

            setUsers(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

            fetchUsers()
            hasFetched.current = true
        }
    }, [])

    return (
        <UsersContext.Provider value={users}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    return useContext(UsersContext)
}
