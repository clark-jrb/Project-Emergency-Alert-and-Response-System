import React, { useEffect } from 'react'
import { useUsersContext } from '../../context/UsersContext'
import { useMessageContext } from '../../context/MessagesContext'
import TimeAgo from '../../hooks/buttons/TimeAgo'
import { useAuth } from '../../context/AuthContext'
import { useActiveContext } from '../../context/ActiveContext'


const GetMessages = () => {
    const { currentUser } = useAuth()
    const { users, admins } = useUsersContext()
    const { activeMessage, setTheMessageActive, messages } = useMessageContext()
    const {  setTheActiveUser } = useActiveContext()

    // const filteredMessages = messages.filter(message =>
    //     message.chatroomID.includes('TXmvnpBMntCramMNxwNs')
    // )
    // useEffect(() => {
    //     console.log(activeMessage);
    // }, [activeMessage]);
    
    
    return (
        <div className='get-messages pt-3'>
            {messages.map(message => {
                const userId = message.chatroomID.slice(0, message.chatroomID.indexOf('_'))
                const user = users.find(user => user.id === userId)

                const handleClick = () => {
                    setTheMessageActive(message.chatroomID.toString())
                    setTheActiveUser(user.id)
                }
        
                return (
                <div key={message.id}>
                    {user && (
                    <div key={user.id} className={`message-person-con container py-2 ${activeMessage === message.id ? 'active' : ''}`} onClick={() => handleClick()}>
                        {/* Person Name Initials */}
                        <div className='name-logo'>
                            <p className='m-0'>{user.fullname.slice(0, 1)}</p>
                        </div>
                        {/* Message */}
                        <div className='message-info'>
                            {/* Person Name */}
                            <p className='m-0 person-name'>{user.fullname}</p>
                            {/* Person Message */}
                            <div className='person-mess-cont d-flex'>
                                <p className={`m-0 person-message ${message.unread === true ? 'new-chat' : ''}`}>{message.lastSentMessage}</p>
                                <span className='timestamp'> • <TimeAgo date={message.date} time={message.time}/></span>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                )
            })}
        </div>
    )
}

export default GetMessages