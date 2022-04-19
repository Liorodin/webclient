import React, { useState } from 'react'
import { messages } from '../db/messages';
import { users } from '../db/users';

export function GetProfilePic(user) {
    switch (user.picture) {
        case 'avatar':
            return <div className="avatar">{user.nickname[0].toUpperCase()}</div>;
        case 'default':
            return <img src="contactImage.webp" />;
        default:
            return <img src={user.picture} />;
    }
}

export function ContactMessages(firstName, secondName) {
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].contacts.includes(firstName) && messages[i].contacts.includes(secondName)) {
            return messages[i].list;
        }
    }
    return [];
}

export function GetUser(userName) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == userName) {
            return users[i];
        }
    }
    return {
        username: 'not found',
        nickname: 'not found',
        password: null,
        picture: 'default',
    }
}

export default function Contact({ name, currentContact, displayNameSetter }) {
    //gets current contact
    const contact = GetUser(name);
    //gets current logged user
    const myUserName = JSON.parse(localStorage.getItem('currentUser'));
    //gets the message list between current contact and logged user
    const messages = ContactMessages(myUserName, name);
    //state of last message
    const [lastMessage, setLastMessage] = useState(messages.at(-1));

    const time = new Date;
    const getTime = () => {
        const day = 86400000;
        const difference = (time.getTime() - lastMessage.time);
        if (difference < day) {
            var lastTime = new Date(lastMessage.time);
            const [hour, minute] = lastTime.toString().split(' ')[4].split(':')
            var minuteDif = time.getMinutes() - minute;
            if (time.getHours() - hour == 0 && Math.abs(minuteDif) <= 5) {
                if (minuteDif < 1) {
                    return 'now';
                }
                else {
                    return minuteDif + ' minutes ago';
                }
            }
            if (time.getHours() - hour == 1 && Math.abs(minuteDif) >= 55) {
                minuteDif = 60 - minuteDif;
                if (minuteDif < 1) {
                    return 'now';
                }
                else {
                    return minuteDif + ' minutes ago';
                }
            }
            else {
                return hour + ':' + minute;
            }
        }
        else if (difference < day * 2) {
            return '2 days ago'
        }
        else if (difference < day * 3) {
            return '3 days ago'
        }
        else if (difference < day * 4) {
            return '4 days ago'
        }
        else if (difference < day * 5) {
            return '5 days ago'
        }
        else if (difference < day * 6) {
            return '6 days ago'
        }
        else if (difference < day * 14) {
            return 'a week days ago'
        }
        else if (difference < day * 31) {
            return 'this month'
        }
        else {
            return ''
        }
    }

    //updates last message content
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { setLastMessage(messages.at(-1)); } });
    document.addEventListener('click', () => setLastMessage(messages.at(-1)));

    //shows chat on display
    const enterContactChat = () => {
        //updates cuurent contact name on display
        displayNameSetter(contact.username);
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

    return (
        <div id='name' className='contact person' onClick={enterContactChat}>
            {GetProfilePic(contact)}
            <div className='name'>{contact.nickname}</div>
            <div className='preview'>{messages.length ? lastMessage.content : ''}</div>
            <div className='time'>{messages.length ? getTime() : ''}</div>
            <hr></hr>
        </div>
    )
}