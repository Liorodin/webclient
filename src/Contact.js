import React from 'react'
import GetUser from './GetUser'
import ContactMessages from './ContactMessages';

export default function Contact({ name, condition = false }) {
    const user = GetUser(name);
    const myUserName = JSON.parse(localStorage.getItem('currentUser'));
    const messages = ContactMessages(myUserName, name);
    const enterContactChat = () => {
        if (localStorage.getItem('currentContact') == JSON.stringify(name)) {
            return;
        }
        localStorage.setItem('currentContact', JSON.stringify(name));
        document.getElementById('massage-box').innerHTML = '';
        messages.map((message) => {
            var newLi = document.createElement('li');
            if (message.from == myUserName) {
                newLi.classList.add('ours');
            }
            newLi.appendChild(document.createTextNode(message.content));
            document.getElementsByClassName('messages massage-box')[0].appendChild(newLi);
        })
    }

    if (condition) {
        const lastMessage = messages.at(-1);
        return (
            <div className='contact' onClick={enterContactChat}>
                <div className='contact-name'>{user.nickname}</div>
                <div className='last-message'>{lastMessage.content}</div>
                <div className='last-message time'>{lastMessage.time}</div>
            </div>
        )
    }

    return (
        <div className='contact' onClick={enterContactChat}>
            <div className='contact-name'>{user.nickname}</div>
            <div className='last-message'></div>
            <div className='last-message time'></div>
        </div>
    )
}