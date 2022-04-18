import React, { useState } from 'react'
import { messages } from '../db/messages';
import { users } from '../db/users';
import { contactsList } from '../db/contactsList';

export function GetProfilePic(user, gaga) {
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

export function ContactMessages(firstName, secondName) {
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

export function AddNewContact(setter) {
    const newContact = document.getElementById('newContact').value;
    if (!newContact || GetUser(newContact).username == 'not found') {
        return;
    }
    var flag = 0;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    for (var i = 0; i < contactsList.length; i++) {
        if (contactsList[i].username == currentUser) {
            if (contactsList[i].contactsList.includes(newContact)) {
                return;
            }
            contactsList[i].contactsList.push(newContact);
            messages.push({
                contacts: [newContact, currentUser],
                list: [],
            })
            setter(oldValue => oldValue + 1);
            document.getElementById('newContact').value = '';
            flag++;
        }
        else if (flag != 2 && contactsList[i].username == newContact) {
            contactsList[i].contactsList.push(currentUser);
            flag++;
        }
        if (flag == 2) {
            return;
        }
    }
}

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

    if (!messages.length) {
        /*new contact without messages*/
        return (
            <div id='name' className='contact person' onClick={enterContactChat}>
                {GetProfilePic(contact)}
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
            {GetProfilePic(contact)}
            <div className='contact-name name'>{contact.nickname}</div>
            <div className='last-message preview'>{lastMessage.content}</div>
            <div className='last-message time'>{lastMessage.time}</div>
            <hr></hr>
        </div>
    )
}