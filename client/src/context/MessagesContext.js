import { createContext, useContext, useState, useEffect } from 'react'
import { collection, count, getDocs, onSnapshot, updateDoc, doc } from 'firebase/firestore'
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
    const [activeMessage, setMessageActive] = useState(null)
    const [loadingMessages, setLoadingMessages] = useState(true)

    const findAdmin = admins.find(admin => admin.email === currentUser.email)

    const setTheMessageActive = (id) => {
        setMessageActive(id)
    }

    const messageCollection = collection(db, `message_${findAdmin.route}`)
    
    useEffect(() => {
        onSnapshot(messageCollection, (messageSnapshot) => {
            // console.log('Main collection updated:', messageSnapshot.docs.map(doc => doc.data()));

            if (messageSnapshot.docs.length === 0) {
                // Handle empty collection
                console.log('Collection is empty');
                // You can set state or handle it in any way you prefer
                setMessages([]);
                setMessCount(0);
                return;
            }
            
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
    }, []);

    useEffect(() => {
        if (activeMessage != null) {
            const chatsCollection = collection(messageCollection, activeMessage, 'chats')

            if (chatsCollection) {
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

                    const specChatDoc = doc(messageCollection, activeMessage)
                    updateDoc(specChatDoc, {
                        lastSentMessage: lastSentChat,
                        lastSenderID: lastSender,
                        timestamp: lastTimestamp
                    })

                    setChats(sortedChat)
                });
            } else {
                console.log('Collection does not exist yet');
            }

        } else {
            setChats([])
        }
    }, [activeMessage]);


    // useEffect(() => {
    //     if (messages.length > 0) {
    //         console.log(messages);
    //     }
    // }, [messages]);

    // useEffect(() => {
    //     if (chats.length > 0) {
    //         console.log(chats);
    //     } else {
    //         console.log('no chat selected');
    //     }
    // }, [chats]);

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

