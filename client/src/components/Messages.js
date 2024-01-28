import React from 'react'
import '../styles/messages.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MessagesList from '../views/Messages/messages-list'
import MessagesContent from '../views/Messages/messages-content'
import { FilterListProvider } from '../context/FilterListContext'
import { MessageProvider } from '../context/MessagesContext'

const Messages = () => {
    return (
        <div className='messages-content p-4'>
            <FilterListProvider>
                <MessageProvider>
                    <MessagesList/>
                    <MessagesContent/>
                </MessageProvider>
            </FilterListProvider>
        </div>
    )
}

export default Messages