import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from './Input';
import axios from 'axios';
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';

export default function Login({ setCurrentUser }) {

    const [error, setError] = useState("");
    let navigate = useNavigate();
    const login = async () => {
        ResetHidden();
        if (ShowHidden()) {
            var userName = document.getElementById('Username').value;
            var userPassword = document.getElementById('Password').value;
            const res = await axios(
                {
                    method: 'post',
                    url: 'https://localhost:7290/api/Users/Login',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    data:
                    {
                        username: userName,
                        password: userPassword
                    }
                }).catch(res => {
                    //check if the server isn't connected
                    if (res == "Error: Network Error") {
                        setError('network');
                    }
                    else {
                        setError('wrong');
                    }
                    return 2;
                });
            if (res.status && res.status == 200) {
                localStorage.setItem('currentUser', JSON.stringify(userName));
                localStorage.setItem('userToken', JSON.stringify(res.data));
                setCurrentUser(userName);
                navigate("/chatview");
            }
            document.getElementById("myForm").reset();
        }
    }

    return (
        <form id="myForm" className='cube center-form'>
            <h1>Shirin's and Leonardo's WebClient</h1>
            <hr></hr>
            {(error === 'wrong') ? (<div className="alert alert-danger">Wrong password or username</div>) : ""}
            {(error === 'network') ? (<div className="alert alert-danger">Can't reach server</div>) : ""}
            
            <Input inputName="Username" inputType="text" text='Username' />
            <Input inputName="Password" inputType="password" text='Password' />
            <div>
                <input type="button" value="Login" className="btn" onClick={login}></input>
                Not registered? <Link to="/register">Click here</Link> to register
            </div>
        </form>
    )
}