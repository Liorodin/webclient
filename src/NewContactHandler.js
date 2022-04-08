import React from 'react'
import Input from './Input'

document.getElementById('root').addEventListener('click', () => {
    var addDisplay = document.getElementById('add-contact');
    if (addDisplay && addDisplay.style.display != 'none') {
        addDisplay.style.display = 'none';
        document.getElementById('newContact').value = '';
    }
})

const handler = () => {
    var addDisplay = document.getElementById('add-contact');
    if (addDisplay) {
        addDisplay.style.display = 'flex';
    }
}

export default function NewContactHandler({ func }) {
    return (
        <div id='add-contact' onClick={handler}>
            <div className='contact-btn-div'><button className="contact-add-btn" onClick={func}>add</button></div>
            <Input inputName="newContact" inputType="text" text='Enter new contact:' />
        </div>
    )
}
