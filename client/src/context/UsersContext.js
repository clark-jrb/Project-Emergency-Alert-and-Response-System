import { createContext, useContext, useState, useEffect, useRef } from 'react'

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
        const fetchUsers = async () => {
            try {
            const response = await fetch('http://localhost:4000/users')

            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            } else {
                console.log('Error occurred')
            }
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
