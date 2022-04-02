import React from 'react'
import { Link } from 'react-router-dom';
import currentUser from './CurrentUser'
export default function ChatView({currentUser}) {
  return (
    <div className='container'>
      <h1 className='borderW'>Current user is: {currentUser}</h1>
      <div>
        <ol className="messages">
          <li className="ours">Hi, babe!</li>
          <li className="ours">I have something for you.</li>
          <li>What is it?</li>
          <li className="ours">Just a little something.</li>
          <li>Johnny, its beautiful. Thank you. Can I try it on now?</li>
          <li className="ours">Sure, it's yours.</li>
          <li>Wait right here.</li>
          <li>I'll try it on right now.</li>
        </ol>
      </div>
      <Link to='/'>Click</Link>
    </div>
  )
}
