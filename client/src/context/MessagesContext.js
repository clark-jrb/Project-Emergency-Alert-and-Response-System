import { createContext, useContext, useState, useEffect } from 'react'
import { collection, count, getDocs, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'

const MessageContext = createContext()

export const useMessageContext = () => {
    return useContext(MessageContext)
}

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [messCount, setMessCount] = useState(0);
    const [activeMessage, setMessageActive] = useState(null)

    const setTheMessageActive = (id) => {
        setMessageActive(id)
    }

    const messageCollection = collection(db, 'message_usf')
    
    useEffect(() => {
        onSnapshot(messageCollection, (messageSnapshot) => {
            // console.log('Main collection updated:', messageSnapshot.docs.map(doc => doc.data()));
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
        });
    }, []);

    useEffect(() => {
        if (activeMessage != null) {
            const chatsCollection = collection(messageCollection, activeMessage, 'chats')

            onSnapshot(chatsCollection, (chatsSnapshot) => {
                // console.log('Sub-collection updated:', chatsSnapshot.docs.map(doc => doc.data()));
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

                const lastSentChat = sortedChat.length > 0 ? sortedChat[0].message.toString() : ''
                const lastSender = sortedChat.length > 0 ? sortedChat[0].sender.toString() : ''
                const lastTimestamp = sortedChat.length > 0 ? sortedChat[0].timestamp : ''

                const specChatDoc = doc(db, 'message_usf', activeMessage)
                updateDoc(specChatDoc, {
                    lastSentMessage: lastSentChat,
                    lastSenderID: lastSender,
                    timestamp: lastTimestamp
                })

                setChats(sortedChat)
            });
        } else {
            setChats([])
        }
    }, [activeMessage]);


    // useEffect(() => {
    //     if (messages.length > 0) {
    //         console.log(messages);
    //     }
    // }, [messages]);

    useEffect(() => {
        if (chats.length > 0) {
            console.log(chats);
        } else {
            console.log('no chat selected');
        }
    }, [chats]);

    return (
        <MessageContext.Provider value={{ 
            messages, 
            messCount, 
            setTheMessageActive, 
            activeMessage, 
            chats 
        }}>
            {children}
        </MessageContext.Provider>
    )
}

