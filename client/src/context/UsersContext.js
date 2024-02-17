import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    // const hasFetched = useRef(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const userQuerySnapshot = await getDocs(collection(db, 'users'));
                const userData = userQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setUsers(userData);

                const adminQuerySnapshot = await getDocs(collection(db, 'response_team'));
                const adminData = adminQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setAdmins(adminData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (admins.length > 0) {
    //         console.log(admins);
    //     }
    // }, [admins]);

    return (
        <UsersContext.Provider value={ { users, admins } }>
            {!loading && children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    return useContext(UsersContext)
}
