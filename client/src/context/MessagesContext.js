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
    // const [count, setCount] = useState(0)
    // const [recentRequest, setRecentRequest] = useState([])

    const fetchMessages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'chatroom'));
            const data = [];
    
            for (const doc of querySnapshot.docs) {
                const { timestamp, ...rest } = doc.data();
                const timepoint = timestamp.toDate();
    
                const date = moment(timepoint).format('LL');
                const time = moment(timepoint).format('LT');
    
                const chatCollection = collection(db, 'chatroom', doc.id, 'chats');
                const chatQuerySnapshot = await getDocs(chatCollection);
                const chatData = chatQuerySnapshot.docs.map((chatDoc) => {
                    const chatTimestamp = chatDoc.data().timestamp.toDate();
                    const chatDate = moment(chatTimestamp).format('LL');
                    const chatTime = moment(chatTimestamp).format('LT');

                    return {
                        date: chatDate,
                        time: chatTime,
                        ...chatDoc.data()
                    };
                });

                // Sort the data array based on the timestamp in descending order

                const sortedChat = chatData.sort((a, b) => {
                    const dateA = new Date(`${a.date} ${a.time}`);
                    const dateB = new Date(`${b.date} ${b.time}`);

                    return dateB - dateA;
                });

                // Take the first element (most recent request) from the sorted array
                const lastSentChat = sortedChat.length > 0 ? sortedChat[0].message.toString() : ''

                console.log('Recent chat: ', lastSentChat)
    
                const message = {
                    date: date,
                    time: time,
                    chats: sortedChat,
                    ...rest
                };
    
                data.push(message);
            }
    
            setMessages(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'chatroom'), async (snapshot) => {
            const data = [];
    
            for (const doc of snapshot.docs) {
                const { timestamp, ...rest } = doc.data();
                const timepoint = timestamp.toDate();
    
                const date = moment(timepoint).format('LL');
                const time = moment(timepoint).format('LT');
    
                const chatCollection = collection(db, 'chatroom', doc.id, 'chats');
                const chatQuerySnapshot = await getDocs(chatCollection);
                const chatData = chatQuerySnapshot.docs.map((chatDoc) => {
                    const chatTimestamp = chatDoc.data().timestamp.toDate();
                    const chatDate = moment(chatTimestamp).format('LL');
                    const chatTime = moment(chatTimestamp).format('LT');

                    return {
                        id: chatDoc.id,
                        date: chatDate,
                        time: chatTime,
                        ...chatDoc.data()
                    };
                });

                const sortedChat = chatData.sort((a, b) => {
                    const dateA = new Date(`${a.date} ${a.time}`);
                    const dateB = new Date(`${b.date} ${b.time}`);

                    return dateB - dateA;
                });

                // Take the first element (most recent request) from the sorted array
                const lastSentChat = sortedChat.length > 0 ? sortedChat[0].message.toString() : ''

                console.log('Recent chat: ', lastSentChat)

                const chatroomDocRef = doc.ref;
                await updateDoc(chatroomDocRef, { lastSentMessage: lastSentChat });
    
                const message = {
                    lastSentMessage: lastSentChat,
                    date: date,
                    time: time,
                    chats: sortedChat,
                    ...rest
                };
    
                data.push(message);
            }
    
            setMessages(data);
        });
    
        // Cleanup function to unsubscribe from real-time updates when the component unmounts
        return () => unsubscribe();
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

