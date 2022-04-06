import React from 'react'
import GetUser from './GetUser'

export default function Contact({ name }) {
    const user = GetUser(name);
    return (
        <div className='contact'>
            <div className='contact-name'>{user.nickname}</div>
            <div className='last-message'>last-message</div>
            <div className='last-message time'>00:00</div>
        </div>
    )
}
