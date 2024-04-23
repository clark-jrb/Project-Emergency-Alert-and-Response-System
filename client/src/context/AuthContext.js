import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [loading, setLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState(() => {
        const savedRole = localStorage.getItem('currentUserRole');
        return savedRole ? JSON.parse(savedRole) : null;
    });

    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                setCurrentUser(user);
                setLoading(false);
                if (user) {
                    const email = user.email;
                    const querySnapshot = await getDocs(query(collection(db, 'rt_users'), where('email', '==', email)));
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        const userRole = userData.role;
                        if (userRole) {
                            setCurrentUserRole(userRole);
                            localStorage.setItem('currentUserRole', JSON.stringify(userRole));
                        } else {
                            console.log('No role exists');
                        }
                    });
                }
            });

            // Cleanup function
            return () => {
                unsubscribe();
            };
        };

        fetchData();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setCurrentUserRole(null);

            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserRole');

            console.log('Sign-out successful');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    const value = {
        currentUser,
        currentUserRole,
        signOut: handleSignOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};