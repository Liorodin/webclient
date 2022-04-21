import React, { useState, useEffect, useRef } from 'react'
import { messages } from '../db/messages';
import { users } from '../db/users';

export function GetProfilePic(user) {
    switch (user.picture) {
        // case the user gives a picture
        case 'avatar':
            return <div className="avatar">{user.nickname[0].toUpperCase()}</div>;
        case 'default':
            return <img src="contactImage.webp" />;
        default:
            return <img src={user.picture} />;
    }
}

export function GetContactMessages(firstName, secondName) {
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].contacts.includes(firstName) && messages[i].contacts.includes(secondName)) {
            return messages[i].list;
        }
    }
    return [];
}

/*returns the username */
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

const getTime = (lastMessage) => {
    const time = new Date;
    const day = 86400000;
    const difference = (time.getTime() - lastMessage.time);
    if (difference < day) {
        var lastTime = new Date(lastMessage.time);
        const [hour, minute] = lastTime.toString().split(' ')[4].split(':')
        var minuteDif = time.getMinutes() - parseInt(minute);
        if (time.getHours() - parseInt(hour) == 0 && Math.abs(minuteDif) <= 5) {
            if (minuteDif < 1) {
                return 'now';
            }
            else {
                return minuteDif + ' minutes ago';
            }
        }
        if ((time.getHours() - parseInt(hour) == 1 || time.getHours() - parseInt(hour) == 23)
            && 59 >= Math.abs(minuteDif) >= 55) {
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
        return 'Yesterday'
    }
    else if (difference < day * 3) {
        return '2 days ago'
    }
    else if (difference < day * 4) {
        return '3 days ago'
    }
    else if (difference < day * 5) {
        return '4 days ago'
    }
    else if (difference < day * 6) {
        return '5 days ago'
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


// //shows chat on display
// const enterContactChat = () => {
//     //updates cuurent contact name on display
//     displayNameSetter(contact.username);
//     //checks if nobody is on display
//     if (currentContact == '') {
//         document.getElementById('welcome').style.display = 'none';
//         document.getElementById('chat-grid').style.display = 'grid';
//     }
//checks if the contact is already on display
//         if (currentContact == GetUser(name).nickname) {
//             return;
//         }
//         //updates current contact
//         localStorage.setItem('currentContact', JSON.stringify(name));
//         //inserts chat
//         document.getElementById('massage-box').innerHTML = '';
//         for (var i = 0; i < contactMessages.length; i++) {
//             var newLi = document.createElement('li');
//             var newDiv = document.createElement('div');
//             newDiv.classList.add('message-time')
//             if (contactMessages[i].from == myUserName) {
//                 newLi.classList.add('ours');
//             }
//         if
//             newLi.appendChild(document.createTextNode(contactMessages[i].content));
//             newDiv.appendChild(document.createTextNode((new Date(contactMessages[i].time)).toLocaleTimeString('en-GB',
//                 {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                 })));
//             newLi.appendChild(newDiv);

//             document.getElementsByClassName('messages massage-box')[0].appendChild(newLi);
//         }
//     box.scroll(0, box.scrollHeight);
// }

export default function Contact({ name, currentContact, displayNameSetter }) {
    const contact = GetUser(name);
    //gets current logged user
    const myUserName = JSON.parse(localStorage.getItem('currentUser'));
    //gets the message list between current contact and logged user
    const contactMessages = GetContactMessages(myUserName, name);
    //state of last message
    const lastMessage = contactMessages.at(-1);

    //shows chat on display
    const enterContactChat = () => {
        //updates cuurent contact name on display
        displayNameSetter(contact.username);
        //updates current contact
        localStorage.setItem('currentContact', JSON.stringify(name));
        //inserts chat
        const box = document.getElementById('massage-box');
        box.innerHTML = '';
        for (var i = 0; i < contactMessages.length; i++) {
            var newLi = document.createElement('li');
            var newDiv = document.createElement('div');
            newDiv.classList.add('message-time')
            if (contactMessages[i].from == myUserName) {
                newLi.classList.add('ours');
            }
            if (contactMessages[i].type == 'text') {
                newLi.appendChild(document.createTextNode(contactMessages[i].content));
            }
            newDiv.appendChild(document.createTextNode((new Date(contactMessages[i].time)).toLocaleTimeString('en-GB',
                {
                    hour: '2-digit',
                    minute: '2-digit',
                })));
            newLi.appendChild(newDiv);
            document.getElementsByClassName('messages massage-box')[0].appendChild(newLi);
        }
        box.scroll(0, box.scrollHeight);
    }

    return (
        <div id={contact.username} className='contact person' onClick={() => {
            //checks if nobody is on display
            if (currentContact == '') {
                document.getElementById('welcome').style.display = 'none';
                document.getElementById('chat-grid').style.display = 'grid';
            }
            //updates current contact
            enterContactChat(name, contact, displayNameSetter)
        }}>
            {GetProfilePic(contact)}
            <div className='name'>{contact.nickname}</div>
            <div className='preview'>{messages.length ? lastMessage.content : ''}</div>
            <div className='time'>{messages.length ? getTime(lastMessage) : ''}</div>
            <hr></hr>
        </div>
    )
}