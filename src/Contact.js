import React, { useState } from 'react'
import GetUser from './GetUser'
import ContactMessages from './ContactMessages';

export default function Contact({ name, displayNameSetter, currentContact }) {
    //gets current contact
    const user = GetUser(name);
    //gets current logged user
    const myUserName = JSON.parse(localStorage.getItem('currentUser'));
    //gets the message list between current contact and logged user
    const messages = ContactMessages(myUserName, name);
    //state of last message
    const [lastMessage, setLastMessage] = useState(messages.at(-1));
    //updates last message content
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && currentContact == user.nickname) {
            setLastMessage(messages.at(-1));
        }
    });

    //shows chat on display
    const enterContactChat = () => {
        //updates cuurent contact name on disply
        displayNameSetter(user.nickname);
        //checks if nobody is on disply
        if (currentContact == '') {
            document.getElementById('welcome').style.display = 'none';
            document.getElementById('chat').style.display = 'block';
        }
        //checks if the contact is already on disply
        if (currentContact == JSON.stringify(name)) {
            return;
        }
        //updates current contact
        localStorage.setItem('currentContact', JSON.stringify(name));
        //inserts chat
        document.getElementById('massage-box').innerHTML = '';
        for (var i = 0; i < messages.length; i++) {
            var newLi = document.createElement('li');
            if (messages[i].from == myUserName) {
                newLi.classList.add('ours');
            }
            newLi.appendChild(document.createTextNode(messages[i].content));
            document.getElementsByClassName('messages massage-box')[0].appendChild(newLi);
        }
    }

    if (!messages.length) {
        return (
            <div id='name' className='contact' onClick={enterContactChat}>
                <div className='contact-name'>{user.nickname}</div>
                <div className='last-message'></div>
                <div className='last-message time'></div>
            </div>
        )
    }
    return (
        <div id='name' className='contact' onClick={enterContactChat}>
            <div className='contact-name'>{user.nickname}</div>
            <div className='last-message'>{lastMessage.content}</div>
            <div className='last-message time'>{lastMessage.time}</div>
        </div>
    )
}