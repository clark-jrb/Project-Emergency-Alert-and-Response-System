import React, { useEffect } from 'react'
import { useMessageContext } from '../../context/MessagesContext'
import { useUsersContext } from '../../context/UsersContext'

const MessagesContent = () => {
    const { messages } = useMessageContext()
    const { users, admins } = useUsersContext()

    // const user = messages.find(user => user.id === messages)

    const filteredMessage = messages.filter(message =>
        message.chatroomID.includes('cera32lkXHPz3vctjYFq3yRPiCd2_TXmvnpBMntCramMNxwNs')
    )

    useEffect(() => {
        if (filteredMessage.length > 0) {
            console.log(filteredMessage);
        }
    }, [filteredMessage]);

    return (
        <div className='mess-content'>
            {filteredMessage.map(message => {
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
                        </div>

                        <div className='mess-body py-2'>
                            {message.chats.map(chat => (
                                <div className='mess-chat p-2 px-3'>
                                    <div className='mess-chat-container p-2 px-3'>
                                        <p className='m-0'>
                                            {chat.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mess-footer pt-2'>
                            <input></input>
                        </div>
                    </div>
                )
            })}
        </div>
        
    )
}

export default MessagesContent