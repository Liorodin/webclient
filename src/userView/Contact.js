import React from 'react'
import { messages } from '../db/messages';
import { users } from '../db/users';

export function GetProfilePic(user) {
    switch (user.picture) {
        // case the user gives a picture
        case 'avatar':
            return <div id="profile-pic" className="avatar" data-bs-toggle="modal" data-bs-target="#changeProfile-modal">{user.nickname[0].toUpperCase()}</div>;
        default:
            return <img id="profile-pic" src={user.picture} data-bs-toggle="modal" data-bs-target="#changeProfile-modal" />;
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
    if (lastMessage == null) {
        return;
    }
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
    else if (difference < day * 7) {
        return '6 days ago'
    }
    else if (difference < day * 14) {
        return 'a week ago'
    }
    else if (difference < day * 31) {
        return 'this month'
    }
    else {
        return ''
    }
}

//shows last message content preview 
const showPreview = (lastMessage) => {
    if (lastMessage == null) {
        return;
    }
    if (lastMessage.type == 'text') {
        return lastMessage.content;
    }
    else if (lastMessage.type == 'picture') {
        <div>
            <svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
            </svg>
            Photo
        </div>
    }
    else if (lastMessage.type == 'audio') {
        return (
            <div>
                <svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                </svg>
                Audio
            </div>
        )
    }
    else if (lastMessage.type.startsWith('video/')) {
        return (
            <div>
                <svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                    <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                Video
            </div>
        )
    }
    return 'Error not'
}

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
        var date = '';
        for (var i = 0; i < contactMessages.length; i++) {
            var options = { weekday: 'long', month: 'long', day: 'numeric' };
            var tempDate = (new Date(contactMessages[i].time)).toLocaleDateString("en-US", options);
            if (date != tempDate) {
                date = tempDate;
                var newDateDiv = document.createElement('div');
                newDateDiv.classList.add('date');
                newDateDiv.appendChild(document.createTextNode(date));
                box.appendChild(newDateDiv);
            }
            var newLi = document.createElement('li');
            var newTimeDiv = document.createElement('div');
            newTimeDiv.classList.add('message-time')
            if (contactMessages[i].from == myUserName) {
                newLi.classList.add('ours');
            }
            if (contactMessages[i].type == 'text') {
                newLi.appendChild(document.createTextNode(contactMessages[i].content));
            }
            else if (contactMessages[i].type == 'picture') {
                var pic = document.createElement('img');
                pic.src = contactMessages[i].content;
                newLi.appendChild(pic);
            }
            else if (contactMessages[i].type == 'audio') {
                var blob = new Blob();
                var audioURL = URL.createObjectURL(blob);
                var audio = new Audio(audioURL);
                audio.setAttribute("controls", 1);
                audio.src = contactMessages[i].content;
                newLi.appendChild(audio);
            }
            else if (contactMessages[i].type.startsWith('video/')) {
                var video = document.createElement('video');
                video.controls = true;
                video.src = contactMessages[i].content;
                newLi.appendChild(video);
            }
            newTimeDiv.appendChild(document.createTextNode((new Date(contactMessages[i].time))
                .toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', })));
            newLi.appendChild(newTimeDiv);
            box.appendChild(newLi);
        }
        box.scroll(0, box.scrollHeight);
    }
    return (
        <div id={contact.username} className='contact person'
            onClick={() => {
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
            <div className='preview'>{showPreview(lastMessage)}</div>
            <div className='time'>{getTime(lastMessage)}</div>
            <hr />
        </div>
    )
}