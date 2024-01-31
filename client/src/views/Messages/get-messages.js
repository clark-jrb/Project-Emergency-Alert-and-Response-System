import React from 'react'
import { useUsersContext } from '../../context/UsersContext'
import { useMessageContext } from '../../context/MessagesContext'
import TimeAgo from '../../hooks/buttons/TimeAgo'
import { useAuth } from '../../context/AuthContext'
import { useActiveContext } from '../../context/ActiveContext'

const GetMessages = () => {
    const { currentUser } = useAuth()
    const { users, admins } = useUsersContext()
    const { messages } = useMessageContext()
    const { activeMessage, setTheMessageActive } = useActiveContext()

    const filteredMessages = messages.filter(message =>
        message.chatroomID.includes('TXmvnpBMntCramMNxwNs')
    )

    const handleClick = (component) => {
        setTheMessageActive(component)
    }
    
    return (
        <div className='get-messages'>
        {filteredMessages.map(message => {
            const userId = message.chatroomID.slice(0, message.chatroomID.indexOf('_'))
            const user = users.find(user => user.id === userId)
    
            return (
            <div key={message.chatroomID}>
                {user && (
                <div key={user.id} className={`message-person-con container py-2 ${activeMessage === message.chatroomID ? 'active' : ''}`} onClick={() => handleClick(message.chatroomID)}>
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
                            <p className='m-0 person-message'>{message.lastSentMessage}</p>
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