import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { collection, onSnapshot, query, orderBy, updateDoc, limit } from 'firebase/firestore'
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
        // const chatsCollection = collection(messageCollection, 'chats');

        const unsubscribe = onSnapshot(messageCollection, async(messageSnapshot) => {
            const data = messageSnapshot.docs.map(async (doc) => {
                const { timestamp, ...rest } = doc.data()
                const timepoint = timestamp.toDate()
                const dataComponent = moment(timepoint).format('LL')
                const timeComponent = moment(timepoint).format('LT')

                const chatsCollection = collection(doc.ref, 'chats');
                const unsubscribeChats = onSnapshot(
                    query(chatsCollection, orderBy('timestamp', 'desc')), // Add limit(1) to get the first document
                    async (chatsSnapshot) => {
                        const addedChats = chatsSnapshot.docChanges().filter((change) => change.type === 'added');
                    
                        if (addedChats.length > 0) {
                            const firstChatDocument = addedChats[0].doc;
                            // Now you can work with the first chat document

                            const updatedData = {
                                // Add the fields you want to update
                                lastSentMessage: firstChatDocument.data().message,
                                lastSenderID: firstChatDocument.data().sender,
                                timestamp: firstChatDocument.data().timestamp
                            };

                            await updateDoc(doc.ref, updatedData);
                            // console.log('Updated chat successfully!');
                        } else {
                            // console.log('No chat added, so nothing to update');
                        }
                    }
                );

                return {
                    id: doc.id,
                    date: dataComponent,
                    time: timeComponent,
                    ...rest,
                    unsubscribeChats
                }
            })

            const resolvedData = await Promise.all(data);

            const readFalseCount = data.filter(item => item.read === false).length

            setMessages(resolvedData)
            setMessCount(readFalseCount)
            setLoadingMessages(false)
        });

        return () => unsubscribe(); // Cleanup on unmount or re-render
    }, [findAdmin]);

    return (
        <MessageContext.Provider value={{ 
            messages, 
            messCount, 
            setTheMessageActive, 
            activeMessage
        }}>
            {!loadingMessages && children}
        </MessageContext.Provider>
    )
}

