import { createContext, useContext, useState, useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'

const MessageContext = createContext()

export const useMessageContext = () => {
    return useContext(MessageContext)
}

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    // const [count, setCount] = useState(0)
    // const [recentRequest, setRecentRequest] = useState([])

    const fetchMessages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'chatroom'))
            const data = querySnapshot.docs.map((doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()
        
                const dataComponent = moment(timepoint).format('LL')
                const timeComponent = moment(timepoint).format('LT')
        
                return {
                    date: dataComponent,
                    time: timeComponent,
                    ...rest
                }
            })

            setMessages(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'chatroom'), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()

                const dataComponent = moment(timepoint).format('LL')
                const timeComponent = moment(timepoint).format('LT')

                return {
                    date: dataComponent,
                    time: timeComponent,
                    ...rest
                }
            })

            // const newStatusCount = data.length

            // Sort the data array based on the timestamp in descending order

            // const sortedData = data.sort((a, b) => {
            //     const dateA = new Date(`${a.date} ${a.time}`);
            //     const dateB = new Date(`${b.date} ${b.time}`);

            //     return dateB - dateA;
            // });

            // const newSortedData = sortedData
            // Take the first element (most recent request) from the sorted array
            // const mostRecent = newSortedData.length > 0 ? newSortedData[0] : null

            // console.log('Count of "New" status:', newStatusCount)
            // console.log('Recent request: ', mostRecent)

            setMessages(data)
            // setCount(newStatusCount)
            // setRecentRequest(mostRecent)
        })

        // Cleanup function to unsubscribe from real-time updates when the component unmounts
        return () => unsubscribe()
    }, [])

    // Reload requests
    const reloadMessages = () => {
        fetchMessages()
    }

    // const setRRCount = (e) => {
    //     setRecentRequest(e)
    // }

    useEffect(() => {
        if (messages.length > 0) {
            console.log(messages);
        }
    }, [messages]);

    return (
        <MessageContext.Provider value={{ messages, reloadMessages }}>
            {children}
        </MessageContext.Provider>
    )
}

