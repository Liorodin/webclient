import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';
import Input from './Input';
import { users } from '../db/users';
import { contactsList } from '../db/contactsList';

export default function Register() {
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const register = (event) => {
        event.preventDefault();
        ResetHidden();
        if (ShowHidden()) {
            if (newRegister()) {
                console.log("Welcome new user!")
                navigate("/");
            }
        }
    }

    /*adds a new user to the list of all the users*/
    function newRegister() {
        var registerUser = document.getElementById("Username").value;
        var registerNickname = document.getElementById("Nickname").value;
        var registerPassword = document.getElementById("Password").value;
        var registerPasswordVerification = document.getElementById("Password Verification").value;
        var newUser = {
            username: registerUser,
            nickname: registerNickname,
            password: registerPassword,
            passwordVerification: registerPasswordVerification,
            picture: 'default',
        }
        // if the user gives a picture, put adress instead of the 'default'


        var hiddenElements1 = document.getElementsByClassName('hidden1');
        // show the errors in the invalid cases
        for (var j = 0; j < users.length; j++) {
            if (registerUser == users[j].username) {
                setError('existedUsername');
                return 0;
            }
        }
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
        users.push(newUser);
        contactsList.push({
            username: newUser.username,
            contactsList: [],
        })
        return 1;
    }

    ///////////////////////////
    const AddNewPicture = () => {

    }

    return (
        <>
            <form action="" className='cube center-form'>
                <h1>Register Now!</h1>
                <hr></hr>
                {(error === 'existedUsername') ? (<div className="alert alert-danger">This username is already in use, please choose other name</div>) : ""}
                {(error === 'passwordLength') ? (<div className="alert alert-danger">This password is too short, please choose password includes at least 4 character and not more than 20</div>) : ""}
                {(error === 'differentPasswords') ? (<div className="alert alert-danger">The password and the varification password are different</div>) : ""}
                {(error === 'numbers') ? (<div className="alert alert-danger">The password should contain numbers too</div>) : ""}
                {(error === 'lettersP') ? (<div className="alert alert-danger">The password should contain letters too</div>) : ""}
                {(error === 'lettersU') ? (<div className="alert alert-danger">The username should contain letters too</div>) : ""}
                {(error === 'lettersN') ? (<div className="alert alert-danger">The nickname should contain letters too</div>) : ""}
                <div>
                    <div className="col">
                        <img src="contactImage.webp" data-bs-toggle="modal" data-bs-target="#addPicture-modal" />
                    </div>
                    <Input inputName="Username" inputType="text" text='Username' />
                    {/* <div>bls </div>  */}
                    <Input inputName="Nickname" inputType="text" text='Nickname' />
                    {/* <div>bls </div>  */}
                    <Input inputName="Password" inputType="password" text='Password' />
                    {/* <div>bls </div>  */}
                    <Input inputName="Password Verification" inputType="password" text='Password Verification' />
                </div>
                <div>
                    <input type="submit" value="Register" className="btn" onClick={register}></input>
                    Already registered? <Link to="/">Click Here</Link> to login
                </div>

            </form>
            <div className="modal fade" id="addPicture-modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new picture</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input id="newContact" type="text" placeholder='Enter new contact by username'></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button id='post-btn' type="button" className="btn btn-primary" onClick={AddNewPicture}>Add now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
