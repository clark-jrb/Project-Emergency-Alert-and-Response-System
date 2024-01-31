import React, { useEffect, useState } from 'react'
import { useMessageContext } from '../../context/MessagesContext'
import { useUsersContext } from '../../context/UsersContext'
import { useActiveContext } from '../../context/ActiveContext'

const MessagesContent = () => {
    const { messages } = useMessageContext()
    const { users, admins } = useUsersContext()
    const { activeMessage, setTheMessageActive } = useActiveContext()
    const [ formValue, setFormValue ] = useState('')

    // const user = messages.find(user => user.id === messages)

    const filteredMessage = messages.filter(message =>
        message.chatroomID.includes('cera32lkXHPz3vctjYFq3yRPiCd2_TXmvnpBMntCramMNxwNs')
    )

    // useEffect(() => {
    //     if (filteredMessage.length > 0) {
    //         console.log(filteredMessage);
    //     }
    // }, [filteredMessage]);

    const handleCloseBtn = (e) => {
        setTheMessageActive(e)
    }

    const sendChat = async(e) => {
        e.preventDefault()
        setFormValue('')
    }

    return (
        <div className='mess-content'>
            {filteredMessage.filter(message => message.chatroomID === activeMessage).map(message => {
                const userId = message.chatroomID.slice(0, message.chatroomID.indexOf('_'))
                const user = users.find(user => user.id === userId)
                
                return (
                    
                    <div className='mess-contents p-4 d-flex' key={message.chatroomID}>

                        <div className='mess-header pb-2 d-flex'>
                            <div className='chat-person-name'>
                                {user && (
                                    <p className='m-0' key={user.id}>{user.fullname}</p>
                                )}
                            </div>
                            <div className='close-btn' onClick={() => handleCloseBtn(null)}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>

                        <div className='mess-body py-2'>
                            {message.chats.map(chat => (
                                <div className='mess-chat p-2 px-3' key={chat.id}>
                                    <div className='mess-chat-container p-2 px-3'>
                                        <p className='m-0'>
                                            {chat.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mess-footer pt-2 '>
                            <form onSubmit={sendChat}>
                                <div className='mess-foot-cont d-flex w-50'>
                                    <input className='chat-input-field px-2' value={formValue} onChange={(e) => setFormValue(e.target.value)}></input>
                                    <button className='send-btn px-2' type='submit'>
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                )
            })}
        </div>
        
    )
}

export default MessagesContent