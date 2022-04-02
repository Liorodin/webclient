import React, { users } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from './Input';

export default function Login({ setFunc }) {
    let navigate = useNavigate();

    const login = () => {
        // window.location.href = "avi.html";
        var userName = document.getElementById('Username').value;
        var password = document.getElementById('Password').value;
        users.map(user => {
            if (user.username == userName && user.password == password) {
                setFunc(userName);
                navigate("/chartview");
            }
        })
    }

    return (
        <form action="" className='cube center-form'>
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
