import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from './Input';
import { users } from './db/users';
import './App.css'

export default function Login({setCurrentUser}) {
    let navigate = useNavigate();
    const login = () => {
        var userName = document.getElementById('Username').value;
        var password = document.getElementById('Password').value;
        users.map(user => {
            if (user.username == userName && user.password == password) {
                localStorage.setItem('currentUser', JSON.stringify(userName));
                console.log(setCurrentUser)
                setCurrentUser(userName);
                navigate("/chatview");
            }
        })
        document.getElementById("myForm").reset();
    }

    return (
        <form action="" id="myForm" className='cube center-form'>
            <h1>Shirin's and Leonardo's WebClient</h1>
            <hr></hr>
            <Input inputName="Username" inputType="text" />
            <Input inputName="Password" inputType="password" />
            <div>
                <input type="button" value="Login" className="btn" onClick={login}></input>
                Not registered? <Link to="/register">Click here</Link> to register
            </div>
        </form>
    )
}
