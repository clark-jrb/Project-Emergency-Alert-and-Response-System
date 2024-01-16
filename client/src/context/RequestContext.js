import { createContext, useContext, useState, useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'

const RequestContext = createContext()

export const useRequestContext = () => {
    return useContext(RequestContext)
}

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([])
    // const hasFetched = useRef(false)
    // const [loading, setLoading] = useState(true)

    const fetchRequests = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'emergency_requests'))
            const data = querySnapshot.docs.map((doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()
        
                const dataComponent = moment(timepoint).format('LL')
                const timeComponent = moment(timepoint).format('LT')
        
                return {
                    id: doc.id,
                    date: dataComponent,
                    time: timeComponent,
                    ...rest
                }
            })

            setRequests(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'emergency_requests'), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()

                const dataComponent = moment(timepoint).format('LL')
                const timeComponent = moment(timepoint).format('LT')

                return {
                    id: doc.id,
                    date: dataComponent,
                    time: timeComponent,
                    ...rest
                }
            })

            setRequests(data)
        })

        // Cleanup function to unsubscribe from real-time updates when the component unmounts
        return () => unsubscribe()
    }, [])

    // useEffect(() => {
    //     if (!hasFetched.current) {
            
    //     fetchRequests()
    //         hasFetched.current = true
    //     }
    // }, [])

    // Reload requests
    const reloadRequests = () => {
        fetchRequests()
    }

    return (
        <RequestContext.Provider value={{ requests, reloadRequests }}>
            {children}
        </RequestContext.Provider>
    )
}

