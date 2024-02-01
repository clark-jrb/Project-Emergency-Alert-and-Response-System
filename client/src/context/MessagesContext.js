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
                    // const { timestamp, ...rest } = chatDoc.data();
                    // const chatTimestamp = timestamp.toDate();

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
                // const lastSender = sortedChat.length > 0 ? sortedChat[0].sender.toString() : ''
                // const lastTimestamp = sortedChat.length > 0 ? sortedChat[0].timestamp : ''

                // console.log('Recent time: ', lastTimestamp)

                const chatroomDocRef = doc.ref;
                await updateDoc(chatroomDocRef, { 
                    lastSentMessage: lastSentChat
                    // lastSenderID: lastSender,
                    // timestamp: lastTimestamp
                });
    
                const message = {
                    // lastSentMessage: lastSentChat,
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


    useEffect(() => {
        if (messages.length > 0) {
            console.log(messages);
        }
    }, [messages]);

    return (
        <MessageContext.Provider value={{ messages }}>
            {children}
        </MessageContext.Provider>
    )
}

