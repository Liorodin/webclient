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
    list.push(<Contact name={userList[i]} />);
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
      <hr></hr>
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
