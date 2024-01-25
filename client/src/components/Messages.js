import React from 'react'
import '../styles/messages.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MessagesList from '../views/Messages/messages-list'
import MessagesContent from '../views/Messages/messages-content'
import { FilterListProvider } from '../context/FilterListContext'

const Messages = () => {
    return (
        <div className='messages-content p-4'>
            <FilterListProvider>
                <MessagesList/>
                <MessagesContent/>
            </FilterListProvider>
        </div>
    )
}

export default Messages