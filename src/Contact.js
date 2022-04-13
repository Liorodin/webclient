import React, { useState, useEffect } from 'react'
import GetUser from './GetUser'
import ContactMessages from './ContactMessages';

export default function Contact({ name, displayNameSetter, currentContact }) {
    //gets current contact
    const contact = GetUser(name);
    //gets current logged user
    const myUserName = JSON.parse(localStorage.getItem('currentUser'));
    //gets the message list between current contact and logged user
    const messages = ContactMessages(myUserName, name);
    //state of last message
    const [lastMessage, setLastMessage] = useState(messages.at(-1));

    //updates last message content
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { setLastMessage(messages.at(-1)); } });
    document.addEventListener('click', () => setLastMessage(messages.at(-1)));
    document.addEventListener('timeupdate', (e) => { console.log(e) });

    //shows chat on display
    const enterContactChat = () => {
        //updates cuurent contact name on display
        displayNameSetter(contact.nickname);
        //checks if nobody is on display
        if (currentContact == '') {
            document.getElementById('welcome').style.display = 'none';
            document.getElementById('chat-grid').style.display = 'grid';
        }
        //checks if the contact is already on display
        if (currentContact == GetUser(name).nickname) {
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
        /*new contact without messages*/
        return (
            <div id='name' className='contact person' onClick={enterContactChat}>
                <img src="contactImage.webp" alt="" />
                <div className='contact-name name'>{contact.nickname}</div>
                <div className='last-message preview'></div>
                <div className='last-message time'></div>
                <hr></hr>
            </div>
        )
    }
    /*existed contacts with messages*/
    return (
        <div id='name' className='contact person' onClick={enterContactChat}>
            <img src="contactImage.webp" alt="" />
            <div className='contact-name name'>{contact.nickname}</div>
            <div className='last-message preview'>{lastMessage.content}</div>
            <div className='last-message time'>{lastMessage.time}</div>
            <hr></hr>
        </div>
    )
}