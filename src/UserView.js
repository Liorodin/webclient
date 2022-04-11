import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Contact from './Contact'
import { contactsList } from './db/contactsList'
import ContactMessages from './ContactMessages';
import GetUser from './GetUser'
import NewContactHandler from './NewContactHandler'
import { messages } from './db/messages';

const getContacts = (currentUser, displayNameSetter, currentContact) => {
  const list = [];
  var userList = [];
  contactsList.map((user) => {
    if (user.username == currentUser) {
      userList = user.contactsList;
    }
  })
  for (let i = 0; i < userList.length; i++) {
    list.push(<Contact name={userList[i]} displayNameSetter={displayNameSetter} currentContact={currentContact} />);
  }
  return list;
}

const profile = (name) => {
  const user = GetUser(name);
  return (
    <div className='user-profile'>
      <div className="avatar"><p>{user.nickname[0].toUpperCase()}</p></div>
      <div className='user-fullName'>{user.nickname}</div>
      <svg xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          var addDisplay = document.getElementById('add-contact');
          if (addDisplay) {
            addDisplay.style.display = 'flex';
          }
        }} width="30" height="30" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
      </svg>
    </div>
  )
}

const postMessage = () => {
  var message = document.getElementById('post-message');
  if (message.value.length == 0) {
    return;
  }
  var newLi = document.createElement('li');
  newLi.classList.add('ours');
  newLi.appendChild(document.createTextNode(message.value));
  const box = document.getElementsByClassName('messages massage-box')[0];
  box.appendChild(newLi);
  box.scroll(0, box.scrollHeight);
  const fromUser = JSON.parse(localStorage.getItem('currentUser'));
  const toUser = JSON.parse(localStorage.getItem('currentContact'));
  var time = new Date;

  ContactMessages(fromUser, toUser).push(
    {
      from: fromUser,
      content: message.value,
      time: time.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    }
  );
  message.value = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (document.getElementById('add-contact').style.display == 'none') { postMessage() }
  }
});
export default function UserView({ currentUser }) {
  const [currentContact, setCurrentContact] = useState('')
  const [openChatCount, setOpenChatCount] = useState(0)

  const addNewContact = () => {
    const newContact = document.getElementById('newContact').value;
    console.log(newContact)
    if (!newContact || GetUser(newContact).username == 'not found') {
      console.log('not found')
      return;
    }
    for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].username == JSON.parse(localStorage.getItem('currentUser'))
        || contactsList[i].username == currentUser) {
        if (contactsList[i].contactsList.includes(newContact)) {
          return;
        }
        contactsList[i].contactsList.push(newContact);
        messages.push({
          contacts: [newContact, currentUser],
          list: [],
        })
        setOpenChatCount(openChatCount + 1);
        // document.getElementById('newContact').value = '';
        return;
      }
    }
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { addNewContact() } });
  return (
    <div className='container'>
      <div className='canvas'>
        <div className='user-side'>
          {profile(currentUser)}
          <NewContactHandler func={addNewContact} />
          <div id='chat-box'>
            <div className='space'></div>
            {getContacts(currentUser, setCurrentContact, currentContact)}
          </div>
        </div>
        <div className='contact-side'>
          <div id='contact-profile'>{currentContact}</div>
          <ol className="messages massage-box" id='massage-box'>
            <div id='welcome'>Welcome to Shirin's and Leonardo's WebClient</div>
          </ol>
          <div className="bottom-bar">
            <div id="chat">
              <input id='post-message' className='message-input' type="text" placeholder="Type a message..." />
              <svg xmlns="http://www.w3.org/2000/svg" onClick={postMessage} width="25" height="25" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </div>
            
          </div>
          <div class="dropup">
              <button className="dropbtn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
              </svg></button>
              <div class="dropup-content">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
                  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                </svg></a>
              </div>
            </div>
        </div>
      </div>
      <Link to='/login'>Click</Link>
    </div>
  )
}
