import React, { useState, useEffect } from 'react'
import { useMessageContext } from '../../context/MessagesContext'
import { useUsersContext } from '../../context/UsersContext'
import { useActiveContext } from '../../context/ActiveContext'
import { useChatsContext } from '../../context/ChatsContext'
import { useAuth } from '../../context/AuthContext'
import { addDoc, collection, updateDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import sendNotification from '../../context/Notification'

const MessagesContent = () => {
    const { currentUser } = useAuth()
    const { activeMessage, setTheMessageActive, messages } = useMessageContext()
    const { chats } = useChatsContext()
    const { users, admins } = useUsersContext()
    const { activeUser } = useActiveContext()
    const [ formValue, setFormValue ] = useState('')
    const { sendNotif } = sendNotification()

    const filteredMessage = messages.find(messages => messages.id === activeMessage)
    const user = users.find(user => user.id === activeUser)

    const findAdmin = admins.find(admin => admin.email === currentUser.email)
    const adminUID = findAdmin.id

    useEffect(() => {
        console.log(adminUID);
    }, [adminUID]);

    const messagesCollection = collection(db, `message_${findAdmin.route}`) 

    const handleCloseBtn = (e) => {
        setTheMessageActive(e)
    }

    const sendChat = async(e) => {
        e.preventDefault()
        const chatsCollection = collection(messagesCollection, activeMessage, 'chats');
        // const querySnapshot = await getDocs(chatroomCollection);

        const chat = {
            message: formValue,
            timestamp: new Date(),
            receiver: activeUser,
            sender: adminUID,
            seen: false,
            delivered: true
        };

        await addDoc(chatsCollection, chat);
        setFormValue('')

        const specDoc = doc(messagesCollection, activeMessage)
        updateDoc(specDoc, {
            read: true,
            user_read: false
        })
        
        sendNotif({
            title: findAdmin.userName,
            body: formValue
        })

        
    }

    const handleInputChange = async (e) => {
        const value = e.target.value
        // console.log('Input value:', value)

        const specDoc = doc(messagesCollection, activeMessage)
        updateDoc(specDoc, {
            unread: false
        })

        // update each message to seen: true
        const chatroomCollection = collection(messagesCollection, activeMessage, 'chats')
        const querySnapshot = await getDocs(chatroomCollection);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            if (data.seen === false) {
                const docRef = doc.ref;
                updateDoc(docRef, { seen: true });
            }
        });

        setFormValue(value)
    }

    return (
        filteredMessage && (
            <div className='mess-contents p-4 d-flex'>

                <div className='mess-header pb-2 d-flex'>
                    <div className='chat-person-name'>
                        {user && (
                            <p className='m-0'>{user.fullname}</p>
                        )}
                    </div>
                    <div className='close-btn' onClick={() => handleCloseBtn(null)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div className='mess-body py-2'>
                    {chats.map(({ id, message, sender }) => (
                        <div className='mess-chat p-2 px-3' key={id}>
                            {message.includes('https://firebasestorage.googleapis.com') ?
                                <div className='mess-image-container'>
                                    <img src={message} alt='chat_photo'></img> 
                                </div>
                            :
                                <div className={`mess-chat-container p-2 px-3 ${sender === adminUID ? 'sender': ''}`}> 
                                    
                                    <p className='m-0'>
                                        {message}
                                    </p>
                                </div>
                            }
                        </div>
                    ))}
                </div>

                <div className='mess-footer pt-2 '>
                    <form onSubmit={sendChat}>
                        <div className='mess-foot-cont d-flex w-50'>
                            <input className='chat-input-field px-2' value={formValue} onChange={handleInputChange} ></input>
                            <button className='send-btn px-2' type='submit'>
                                <i className="fa-regular fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        )
        
    )
}

export default MessagesContent