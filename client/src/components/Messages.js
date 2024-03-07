import React from 'react'
import '../styles/messages.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MessagesList from '../views/Messages/messages-list'
import MessagesContent from '../views/Messages/messages-content'
import { FilterListProvider } from '../context/FilterListContext'
import { ChatsProvider } from '../context/ChatsContext'

const Messages = () => {
    return (
        <div className='messages-content p-4'>
            <FilterListProvider>
                <MessagesList/>

                <ChatsProvider>
                    <MessagesContent/>
                </ChatsProvider>
                
            </FilterListProvider>
        </div>
    )
}

export default React.memo(Messages)