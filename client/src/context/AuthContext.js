import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        // Cleanup function
        return () => {
        unsubscribe()
        }
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            console.log('Sign-out successful')
        } catch (error) {
            console.error('Error signing out:', error.message)
        }
    }

    const value = {
        currentUser,
        signOut: handleSignOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
