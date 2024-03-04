import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'
import { useAuth } from './AuthContext'
import { useUsersContext } from './UsersContext'

const MessageContext = createContext()

export const useMessageContext = () => {
    return useContext(MessageContext)
}

export const MessageProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [messCount, setMessCount] = useState(0);
    const [activeMessage, setActiveMessage] = useState(null)
    const [loadingMessages, setLoadingMessages] = useState(true)

    const findAdmin = useMemo(() => admins.find(admin => admin.email === currentUser.email), [admins, currentUser.email])

    const setTheMessageActive = (id) => {
        setActiveMessage(id)
    }

    useEffect(() => {
        if (!findAdmin) return; // Don't proceed if admin not found

        const messageCollection = collection(db, `message_${findAdmin.route}`)
        const unsubscribe = onSnapshot(messageCollection, (messageSnapshot) => {
            const data = messageSnapshot.docs.map((doc) => {
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

            const readFalseCount = data.filter(item => item.read === false).length
            setMessages(data)
            setMessCount(readFalseCount)
            setLoadingMessages(false)
        });

        return () => unsubscribe(); // Cleanup on unmount or re-render
    }, [findAdmin]);

    useEffect(() => {
        if (!findAdmin || !activeMessage) return; // Don't proceed if admin or active message is null

        const messageCollection = collection(db, `message_${findAdmin.route}`)
        const chatsCollection = collection(messageCollection, activeMessage, 'chats')
        const unsubscribe = onSnapshot(chatsCollection, (chatsSnapshot) => {
            const chatData = chatsSnapshot.docs.map((chatDoc) => {
                const chatTimestamp = chatDoc.data().timestamp.toDate()
                const chatDate = moment(chatTimestamp).format('LL')
                const chatTime = moment(chatTimestamp).format('LTS')
                return {
                    id: chatDoc.id,
                    date: chatDate,
                    time: chatTime,
                    ...chatDoc.data()
                }
            })

            const sortedChat = chatData.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`)
                const dateB = new Date(`${b.date} ${b.time}`)
                return dateB - dateA
            })

            setChats(sortedChat)
        });

        return () => unsubscribe(); // Cleanup on unmount or re-render
    }, [findAdmin, activeMessage]);

    return (
        <MessageContext.Provider value={{ 
            messages, 
            messCount, 
            setTheMessageActive, 
            activeMessage, 
            chats 
        }}>
            {!loadingMessages && children}
        </MessageContext.Provider>
    )
}

