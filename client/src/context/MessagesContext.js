import { createContext, useContext, useState, useEffect } from 'react'
import { collection, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'

const MessageContext = createContext()

export const useMessageContext = () => {
    return useContext(MessageContext)
}

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'message_usf'), async (snapshot) => {
        const data = []

            for (const doc of snapshot.docs) {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()

                const date = moment(timepoint).format('LL')
                const time = moment(timepoint).format('LT')

                const chatCollection = collection(db, 'message_usf', doc.id, 'chats')
                const chatUnsubscribe = onSnapshot(chatCollection, (chatSnapshot) => {
                    const chatData = chatSnapshot.docs.map((chatDoc) => {
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

                    const lastSentChat = sortedChat.length > 0 ? sortedChat[0].message.toString() : ''
                    const lastSender = sortedChat.length > 0 ? sortedChat[0].sender.toString() : ''
                    const lastTimestamp = sortedChat.length > 0 ? sortedChat[0].timestamp : ''

                    const chatroomDocRef = doc.ref
                    updateDoc(chatroomDocRef, {
                        lastSentMessage: lastSentChat,
                        lastSenderID: lastSender,
                        timestamp: lastTimestamp
                    })

                    const message = {
                        date: date,
                        time: time,
                        chats: sortedChat,
                        ...rest
                    }

                    data.push(message)
                    setMessages(data)

                    return () => {
                        // Unsubscribe from the 'chats' sub-collection when the component is unmounted
                        chatUnsubscribe()
                    }
                })
            }
        })

        return () => unsubscribe()
    }, [])

    // useEffect(() => {
    //     if (messages.length > 0) {
    //         console.log(messages)
    //     }
    // }, [messages])

    return (
        <MessageContext.Provider value={{ messages }}>
            {children}
        </MessageContext.Provider>
    )
}

