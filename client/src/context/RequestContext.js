import { createContext, useContext, useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'
import { useAuth } from './AuthContext'
import { useUsersContext } from './UsersContext'

const RequestContext = createContext()

export const useRequestContext = () => {
    return useContext(RequestContext)
}

export const RequestProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [recentRequest, setRecentRequest] = useState([])

    const findAdmin = admins.find(admin => admin.email === currentUser.email)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `alert_${findAdmin.route}`), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()

                const dataComponent = moment(timepoint).format('LL')
                const timeComponent = moment(timepoint).format('LTS')

                return {
                    id: doc.id,
                    date: dataComponent,
                    time: timeComponent,
                    timestamp: timepoint,
                    ...rest
                }
            })

            // count 'new' requests
            const newStatusCount = data.filter(item => item.status === 'New').length

            // Sort the data array based on the timestamp in descending order
            const sortedData = data.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);

                return dateB - dateA;
            });

            const newSortedData = sortedData.filter(item => item.status === 'New')
            // Take the first element (most recent request) from the sorted array
            const mostRecent = newSortedData.length > 0 ? newSortedData[0] : null

            console.log('Count of "New" status:', newStatusCount)
            console.log('Recent request: ', mostRecent)

            setRequests(data)
            setCount(newStatusCount)
            setRecentRequest(mostRecent)
            setLoading(false)
        })

        // Cleanup function to unsubscribe from real-time updates when the component unmounts
        return () => unsubscribe()
    }, [findAdmin.route])

    return (
        <RequestContext.Provider value={{ requests, count, recentRequest }}>
            {!loading && children}
        </RequestContext.Provider>
    )
}

