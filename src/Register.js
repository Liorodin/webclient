import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';
import Input from './Input';
import { users } from './users';

export default function Register() {
    let navigate = useNavigate();

    const register = (event) => {
        event.preventDefault();
        ResetHidden();
        if (ShowHidden()) {
            newRegister();
            console.log("Welcome new user!")
            navigate("/");
        }
    }


    /*adds a new user to the list of all the users*/
    function newRegister() {
        var registerUser = document.getElementById("Username").value;
        var registerNickname = document.getElementById("Nickname").value;
        var registerPassword = document.getElementById("Password").value;
        var newUser = {
            username: registerUser,
            nickname: registerNickname,
            password: registerPassword,
        }

        var hiddenElements1 = document.getElementsByClassName('hidden1');
        var flag = 1;
        // show the errors in the invalid cases
        for (var j = 0; j < users.length; j++) {
            if (registerUser == users[j].username) {
                //
                console.log("userrrr");
                hiddenElements1[0].style.display = 'block';
                flag = 0;
            }
            if (registerPassword.length < 4 || registerPassword.length > 20) {
                //
                console.log("passworddd");
                hiddenElements1[2].style.display = 'block';
                flag = 0;
            }
            if (flag) {
                users.push(newUser);
            }
        }
    }

    return (
        <form action="" className='cube center-form'>
            <h1>Register Now!</h1>
            <hr></hr>
            <Input inputName="Username" inputType="text" />
            {/* <div>bls </div>  */}
            <Input inputName="Nickname" inputType="text" />
            {/* <div>bls </div>  */}
            <Input inputName="Password" inputType="password" />
            {/* <div>bls </div>  */}
            <div>
                <input type="submit" value="Register" className="btn" onClick={register}></input>
                Already registered? <Link to="/">Click Here</Link> to login
            </div>
        </form>
    )

    /*adds a new user to the list of all the users*/
    function newRegister() {
        var registerUser = document.getElementById("Username").value;
        var registerNickname = document.getElementById("Nickname").value;
        var registerPassword = document.getElementById("Password").value;
        var newUser = {
            username: registerUser,
            nickname: registerNickname,
            password: registerPassword
        }
        for (var i = 0; i < users.length; i++) {
            if (registerUser == users[i].username) {
                alert("This username is already in use, please choose other");
                return;
            }
            else if (registerPassword.length < 5) {
                alert("This password is too short, please choose password includes at least 5 characters");
                return;
            }
        }
        users.push(newUser);
    }
}
