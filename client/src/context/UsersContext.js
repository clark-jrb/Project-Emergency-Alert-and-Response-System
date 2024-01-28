import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    // const hasFetched = useRef(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'))
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

                setUsers(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchUsers()
    }, [])

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'response_team'))
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

                setAdmins(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchAdmins()
        
    }, [])

    useEffect(() => {
        if (admins.length > 0) {
            console.log(admins);
        }
    }, [admins]);

    return (
        <UsersContext.Provider value={ { users, admins } }>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    return useContext(UsersContext)
}
