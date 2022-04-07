import React from 'react'
import GetUser from './GetUser'
import { messages } from './db/messages';

export default function Contact({ name, condition = false }) {
    const user = GetUser(name);
    const getLastMessage = () => {
        var contactChat;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].contacts.includes(name) && messages[i].contacts.includes(JSON.parse(localStorage.getItem('currentUser')))) {
                contactChat = messages[i].list.at(-1);
                break;
            }
        }
        return contactChat;
    }

    const message = getLastMessage();
    if (condition) {
        return (
            <div className='contact'>
                <div className='contact-name'>{user.nickname}</div>
                <div className='last-message'>{message.content}</div>
                <div className='last-message time'>{message.time}</div>
            </div>
        )
    }
    
    return (
        <div className='contact'>
            <div className='contact-name'>{user.nickname}</div>
            <div className='last-message'></div>
            <div className='last-message time'></div>
        </div>
    )
}