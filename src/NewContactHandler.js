import React from 'react'
import Input from './Input'
import { contactsList } from './db/contactsList'
import GetUser from './GetUser'
import { messages } from './db/messages';

// document.getElementById('root').addEventListener('click', () => {
//     var addDisplay = document.getElementById('add-contact');
//     if (addDisplay && addDisplay.style.display != 'none') {
//         addDisplay.style.display = 'none';

//     }
// })

const handler = () => {
    var addDisplay = document.getElementById('add-contact');
    if (addDisplay) {
        document.getElementById('newContact').value = '';
        addDisplay.style.display = 'flex';
    }
}

const addNewContact = (setter) => {
    const newContact = document.getElementById('newContact').value;
    if (!newContact || GetUser(newContact).username == 'not found') {
        return;
    }
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
            return;
        }
    }
}

export default function NewContactHandler({ setter }) {
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { addNewContact(setter) } });
    return (
        <div id='add-contact' onClick={handler}>
            <input id="newContact" type="text" placeholder='Enter new contact'></input>
            <button className="contact-add-btn" onClick={() => addNewContact(setter)}>add</button>
        </div>
    )
}
