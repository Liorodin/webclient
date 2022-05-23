import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';
import Input from './Input';
import axios from 'axios';

import { contactsList } from '../db/contactsList';
import { ProfileImageModal } from '../userView/Modals'


export default function Register() {
    const [error, setError] = useState("");
    let navigate = useNavigate();
    const register = async (event) => {
        event.preventDefault();
        ResetHidden();
        if (ShowHidden()) {
            if (newRegister()) {
                navigate("/");
            }
        }
    }

    /*adds a new user to the list of all the users*/
    const newRegister = async () => {
        var registerUser = document.getElementById("Username").value;
        var registerNickname = document.getElementById("Nickname").value;
        var registerPassword = document.getElementById("Password").value;
        var registerPasswordVerification = document.getElementById("Password Verification").value;
        var registerPicture = document.getElementById("profile").src;

        // show the errors in the invalid cases
        if (registerPassword.length < 4 || registerPassword.length > 20) {
            setError('passwordLength');
            return 0;
        }
        if (registerPassword != registerPasswordVerification) {
            setError('differentPasswords');
            return 0;
        }
        var regExpNumbers = /[0-9]/g;
        if (!regExpNumbers.test(registerPassword)) {
            setError('numbers');
            return 0;
        }
        var regExpLetters = /[a-zA-Z]/g;
        if (!regExpLetters.test(registerPassword)) {
            setError('lettersP');
            return 0;
        }
        var regExpLetters = /[a-zA-Z]/g;
        if (!regExpLetters.test(registerUser)) {
            setError('lettersU');
            return 0;
        }
        var regExpLetters = /[a-zA-Z]/g;
        if (!regExpLetters.test(registerNickname)) {
            setError('lettersN');
            return 0;
        }
        const res = await axios(
            {
                method: 'post',
                url: 'https://localhost:7290/api/Users/Register',
                headers: {
                    'content-Type': 'application/json',
                },
                data:
                {
                    username: registerUser,
                    nickname: registerNickname,
                    password: registerPassword,
                    Picture: registerPicture.split('/').at(-1) == 'contactImage.webp' ? 'avatar' : registerPicture,
                }
            });
        if (res.data != 200) {
            return 0;
        }
        // contactsList.push({
        //     username: registerUser,
        //     contactsList: [],
        // })

        return 1;
    }

    return (
        <>
            <form action="" className='cube center-form'>
                <h1>Register Now!</h1>
                <hr></hr>
                {(error === 'existedUsername') ? (<div className="alert alert-danger">This username is already in use, please choose other name</div>) : ""}
                {(error === 'passwordLength') ? (<div className="alert alert-danger">This password is too short, please choose password includes at least 4 character and not more than 20</div>) : ""}
                {(error === 'differentPasswords') ? (<div className="alert alert-danger">The password and the varification password dont match</div>) : ""}
                {(error === 'numbers') ? (<div className="alert alert-danger">The password should contain numbers too</div>) : ""}
                {(error === 'lettersP') ? (<div className="alert alert-danger">The password should contain letters too</div>) : ""}
                {(error === 'lettersU') ? (<div className="alert alert-danger">The username should contain letters too</div>) : ""}
                {(error === 'lettersN') ? (<div className="alert alert-danger">The nickname should contain letters too</div>) : ""}

                <div className='register'>
                    <div>
                        <Input inputName="Username" inputType="text" text='Username' />
                        <Input inputName="Nickname" inputType="text" text='Nickname' />
                        <Input inputName="Password" inputType="password" text='Password' />
                        <Input inputName="Password Verification" inputType="password" text='Password Verification' />
                    </div>
                    <div className='register-pic'>
                        <img id="profile" src="contactImage.webp" data-bs-toggle="modal" data-bs-target="#addPicture-modal"></img>
                    </div>
                </div>
                <div className='register-submit'>
                    <input type="submit" value="Register" className="btn" onClick={register}></input>
                    <div>
                        Already registered? <Link to="/">Click Here</Link> to login
                    </div>
                </div>
            </form>
            <ProfileImageModal />
        </>
    )
}