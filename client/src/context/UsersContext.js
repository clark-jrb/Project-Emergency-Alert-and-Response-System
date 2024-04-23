import { createContext, useContext, useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [rtUsers, setRTUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingAdmins, setLoadingAdmins] = useState(true);
    const [loadingRTUsers, setLoadingRTUsers] = useState(true);

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

    useEffect(() => {
        const unsubscribeRTUsers = onSnapshot(collection(db, 'rt_users'), (rtUsersQuerySnapshot) => {
            const rtUserData = rtUsersQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRTUsers(rtUserData);
            setLoadingRTUsers(false)
        });
    
        return () => {
            // Unsubscribe from the 'response_team' snapshots when the component unmounts
            unsubscribeRTUsers();
        };
    }, []);

    // useEffect(() => {
    //     if (admins.length > 0) {
    //         console.log(admins);
    //     }
    // }, [admins]);

    return (
        <UsersContext.Provider value={ { users, admins, rtUsers } }>
            {!loadingAdmins && !loadingUsers && !loadingRTUsers && children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    return useContext(UsersContext)
}
