import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from './Input';
import { users } from '../db/users';
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';

export default function Login({ setCurrentUser }) {
    const [error, setError] = useState("");
    let navigate = useNavigate();
    const login = () => {
        ResetHidden();
        // if you managed to login
        if (ShowHidden()) {
            // window.location.href = "avi.html";
            var userName = document.getElementById('Username').value;
            var password = document.getElementById('Password').value;
            users.map(user => {
                if (user.username == userName && user.password == password) {
                    localStorage.setItem('currentUser', JSON.stringify(userName));
                    setCurrentUser(userName);
                    navigate("/chatview");
                }
                else {
                    setError('wrong');
                }
            })
            document.getElementById("myForm").reset();
        }
    }

    return (
        <form action="" id="myForm" className='cube center-form'>
            <h1>Shirin's and Leonardo's WebClient</h1>
            <hr></hr>
            {(error === 'wrong') ? (<div className="alert alert-danger">Wrong password or username</div>) : ""}
            <Input inputName="Username" inputType="text" text='Username' />
            <Input inputName="Password" inputType="password" text='Password' />
            <div>
                <input type="button" value="Login" className="btn" onClick={login}></input>
                Not registered? <Link to="/register">Click here</Link> to register
            </div>
        </form>
    )
}
