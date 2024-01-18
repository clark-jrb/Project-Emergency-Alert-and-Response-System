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
    const [count, setCount] = useState(0)
    const [recentRequest, setRecentRequest] = useState([])
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
        })

        // Cleanup function to unsubscribe from real-time updates when the component unmounts
        return () => unsubscribe()
    }, [])

    // Reload requests
    const reloadRequests = () => {
        fetchRequests()
    }

    const setRRCount = (e) => {
        setRecentRequest(e)
    }

    return (
        <RequestContext.Provider value={{ requests, reloadRequests, count, recentRequest, setRRCount }}>
            {children}
        </RequestContext.Provider>
    )
}

