import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'
import { useAuth } from './AuthContext'
import { useUsersContext } from './UsersContext'
import { useMessageContext } from './MessagesContext'

const ChatsContext = createContext()

export const useChatsContext = () => {
    return useContext(ChatsContext)
}

export const ChatsProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    const { activeMessage } = useMessageContext()
    const [loadingChats, setLoadingChats] = useState(true)
    const [chats, setChats] = useState([])

    const findAdmin = useMemo(() => admins.find(admin => admin.email === currentUser.email), [admins, currentUser.email])

    useEffect(() => {
        
        if (!activeMessage) return // Don't proceed if admin or active message is null
    
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
                    ...chatDoc.data(),
                }
            })
    
            const sortedChat = chatData.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`)
                const dateB = new Date(`${b.date} ${b.time}`)
                return dateB - dateA
            })
    
            setChats(sortedChat)
            setLoadingChats(false)
        })
    
        return () => unsubscribe() // Cleanup on unmount or re-render
    }, [findAdmin.route, activeMessage])

    return (
        <ChatsContext.Provider value={{ chats }}>
            {!loadingChats && children}
        </ChatsContext.Provider>
    )
}


