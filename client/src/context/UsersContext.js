import { createContext, useContext, useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    // const hasFetched = useRef(false)
    // const [loading, setLoading] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingAdmins, setLoadingAdmins] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);

    //             const userQuerySnapshot = await getDocs(collection(db, 'users'));
    //             const userData = userQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //             setUsers(userData);

    //             const adminQuerySnapshot = await getDocs(collection(db, 'response_team'));
    //             const adminData = adminQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //             setAdmins(adminData);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const unsubscribeUsers = onSnapshot(collection(db, 'users'), (userQuerySnapshot) => {
            const userData = userQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setLoadingUsers(false)
            setUsers(userData);
        });
    
        return () => {
            // Unsubscribe from the 'users' snapshots when the component unmounts
            unsubscribeUsers();
        };
    }, []);
    
    useEffect(() => {
        const unsubscribeAdmins = onSnapshot(collection(db, 'response_team'), (adminQuerySnapshot) => {
            const adminData = adminQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAdmins(adminData);
            setLoadingAdmins(false)
        });
    
        return () => {
            // Unsubscribe from the 'response_team' snapshots when the component unmounts
            unsubscribeAdmins();
        };
    }, []);

    // useEffect(() => {
    //     if (admins.length > 0) {
    //         console.log(admins);
    //     }
    // }, [admins]);

    return (
        <UsersContext.Provider value={ { users, admins } }>
            {!loadingAdmins && !loadingUsers && children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    return useContext(UsersContext)
}
