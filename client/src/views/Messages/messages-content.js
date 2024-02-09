import React, { useEffect, useState } from 'react'
import { useMessageContext } from '../../context/MessagesContext'
import { useUsersContext } from '../../context/UsersContext'
import { useActiveContext } from '../../context/ActiveContext'
import { addDoc, collection, updateDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const MessagesContent = () => {
    const { activeMessage, setTheMessageActive, messages, chats } = useMessageContext()
    const { users, admins } = useUsersContext()
    const { activeUser } = useActiveContext()
    const [ formValue, setFormValue ] = useState('')

    const filteredMessage = messages.find(messages => messages.id === activeMessage)
    const user = users.find(user => user.id === activeUser)
    
    // useEffect(() => {
    //     if (filteredMessage) {
            // console.log(filteredMessage);
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log(activeMessage);
    // }, [activeMessage]);

    const handleCloseBtn = (e) => {
        setTheMessageActive(e)
    }

    const sendChat = async(e) => {
        e.preventDefault()
        const chatroomCollection = collection(db, 'message_usf', activeMessage, 'chats');
        // const querySnapshot = await getDocs(chatroomCollection);

        const chat = {
            message: formValue,
            timestamp: new Date(),
            receiver: activeUser,
            sender: 'TXmvnpBMntCramMNxwNs',
            seen: false,
            delivered: true
        };

        await addDoc(chatroomCollection, chat);

        const specDoc = doc(db, 'message_usf', activeMessage)
        updateDoc(specDoc, {
            read: true
        })

        setFormValue('')
    }

    const handleInputChange = async (e) => {
        const value = e.target.value
        // console.log('Input value:', value)

        const specDoc = doc(db, 'message_usf', activeMessage)
        updateDoc(specDoc, {
            unread: false
        })

        // update each message to seen: true
        const chatroomCollection = collection(db, 'message_usf', activeMessage, 'chats')
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
        <div className='mess-content'>
            {filteredMessage && (
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
                                    <div className={`mess-chat-container p-2 px-3 ${sender === 'TXmvnpBMntCramMNxwNs' ? 'sender': ''}`}>
                                        <p className='m-0'>
                                            {message}
                                        </p>
                                    </div>
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
            )}
        </div>
        
    )
}

export default MessagesContent