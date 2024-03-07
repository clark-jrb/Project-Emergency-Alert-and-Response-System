import React from 'react'
import '../styles/messages.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MessagesList from '../views/Messages/messages-list'
import MessagesContent from '../views/Messages/messages-content'
import { FilterListProvider } from '../context/FilterListContext'
import { ChatsProvider } from '../context/ChatsContext'
import { useMessageContext } from '../context/MessagesContext'
import NoChatIcon from '../images/icons/select-chat.png'

const Messages = () => {
    const { activeMessage } = useMessageContext()

    return (
        <div className='messages-content p-4'>
            <FilterListProvider>
                <MessagesList/>

                <div className='mess-content'>
                    {activeMessage === null ? 
                        <>
                            <div className='waiting-cont h-100 w-100 d-flex'>
                                <div className='no-chat-cont'>
                                    <img src={NoChatIcon} alt='no-chat-icon'></img>
                                    <p className='m-0'>
                                        No chats selected
                                    </p>
                                </div>
                            </div>
                        </> 
                            : 
                        <>
                            <ChatsProvider>
                                <MessagesContent/>
                            </ChatsProvider>
                        </>
                    }
                </div>

            </FilterListProvider>
        </div>
    )
}

export default React.memo(Messages)