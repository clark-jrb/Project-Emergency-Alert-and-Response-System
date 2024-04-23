import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore'

const LogsContext = createContext()

export const LogsProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'user_logs'), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()

                return {
                    id: doc.id,
                    timestamp: timepoint,
                    ...rest
                }
            })
            setLogs(data)
        })
        return () => unsubscribe()
    }, []);

    return (
    <LogsContext.Provider value={{ logs }}>
        {children}
    </LogsContext.Provider>
    )
}

export const useLogsContext = () => {
    return useContext(LogsContext)
}
