import React from 'react'
import { Link } from 'react-router-dom';
import Contact from './Contact'
import { contactsList } from './db/contactsList'
import ContactMessages from './ContactMessages';
import GetUser from './GetUser'

const getContacts = currentUser => {
  const list = [];
  var userList = [];
  contactsList.map((user) => {
    if (user.username == currentUser) {
      userList = user.contactsList;
    }
  })
  for (let i = 0; i < userList.length; i++) {
    list.push(<Contact name={userList[i]} condition={true} />);
  }
  return list;
}

const profile = name => {
  const user = GetUser(name);
  return (
    <div className='user-profile'>
      <div className="avatar">
        <p>{user.nickname[0].toUpperCase()}</p>
      </div>
      <div className='user-fullName'>{user.nickname}</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
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
  ContactMessages(fromUser, toUser).push({ from: fromUser, content: message.value, time: '15:00' });
  message.value = '';
}

document.addEventListener('keydown', (e) => { if (e.keyCode == 13) { postMessage() } });
export default function UserView({ currentUser }) {
  return (
    <div className='container'>
      <div className='canvas'>
        <div className='user-side'>
          {profile(currentUser)}
          <div id='chat-box'>
            <div className='space'></div>
            {getContacts(currentUser)}
          </div>
        </div>
        <div className='contact-side'>
          <div className='contact-profile'>contact-profile</div>
          <ol className="messages massage-box" id='massage-box'>
          </ol>
          <div className="bottom-bar">
            <div className="chat">
              <input id='post-message' className='message-input' type="text" placeholder="Type a message..." />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={postMessage} width="25" height="25" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </div>
        </div>
      </div>
      <Link to='/login'>Click</Link>
    </div>
  )
}
