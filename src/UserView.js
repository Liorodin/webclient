import React from 'react'
import { Link } from 'react-router-dom';
import Contact from './Contact'
import { contactsList } from './db/contactsList'
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

const pushNewContact = () => {
  console.log('click');
}

const ooofucus = () => {
  console.log('focus');
}
const profile = name => {
  const user = GetUser(name);
  return (
    <div className='user-profile'>
      <div className="avatar">
        <p>{user.nickname[0].toUpperCase()}</p>
      </div>
      <div className='user-fullName'>{user.nickname}</div>
      <svg xmlns="http://www.w3.org/2000/svg" onFocus={ooofucus} onClick={pushNewContact} width="30" height="30" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
      </svg>
    </div>
  )
}

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
          <ol className="messages massage-box">
            <li className="ours">Hi, babe!</li>
            <li className="ours">I have something for you.</li>
            <li>What is it?</li>
            <li className="ours">Just a little something.</li>
            <li>Johnny, its beautiful. Thank you. Can I try it on now?</li>
            <li className="ours">Sure, it's yours.</li>
            <li>Wait right here.</li>
            <li>I'll try it on right now.</li>
          </ol>

          <div className="bottom-bar">
            <div className="chat">
              <input className='message-input' type="text" placeholder="Type a message..." />
            </div>
          </div>
        </div>
      </div>
      <Link to='/login'>Click</Link>
    </div>
  )
}
