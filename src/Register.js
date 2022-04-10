import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';
import Input from './Input';
import { users } from './db/users';

export default function Register() {
    //
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
        var newUser = {
            username: registerUser,
            nickname: registerNickname,
            password: registerPassword,
        }

        var hiddenElements1 = document.getElementsByClassName('hidden1');
        //var flag = 1;
        // show the errors in the invalid cases
        for (var j = 0; j < users.length; j++) {
            if (registerUser == users[j].username) {
                //
                console.log("userrrr");
                setError('existedUsername');
                //flag = 0;
                return 0;
            }
        }
        // if (registerPassword.length < 4 || registerPassword.length > 20) {
        //     //
        //     console.log("passworddd");
        //     hiddenElements1[2].style.display = 'block';
        //     flag = 0;
        // }
        if (registerPassword.length < 4 || registerPassword.length > 20) {
            //
            console.log("passworddd");
            setError('passwordLength');
            //flag = 0;
            return 0;
        }
        var regExpNumbers = /[0-9]/g;
        if (!regExpNumbers.test(registerPassword)) {
            //
            console.log("numbers");
            setError('numbers');
            //flag = 0;
            return 0;
        }
        var regExpLetters = /[a-zA-Z]/g;
        if (!regExpLetters.test(registerPassword)) {
            //
            console.log("lettersP");
            setError('lettersP');
            //flag = 0;
            return 0;
        }
        var regExpLetters = /[a-zA-Z]/g;
        if (!regExpLetters.test(registerUser)) {
            //
            console.log("lettersU");
            setError('lettersU');
            //flag = 0;
            return 0;
        }
        var regExpLetters = /[a-zA-Z]/g;
        if (!regExpLetters.test(registerNickname)) {
            //
            console.log("lettersN");
            setError('lettersN');
            //flag = 0;
            return 0;
        }
       // if (flag) {
            users.push(newUser);
            return 1;
       // }
    }

    return (
        <form action="" className='cube center-form'>
            <h1>Register Now!</h1>
            <hr></hr>

            {(error === 'existedUsername') ? (<div className="alert alert-danger">This username is already in use, please choose other name</div>) : ""}
            {(error === 'passwordLength') ? (<div className="alert alert-danger">This password is too short, please choose password includes at least 4 character and not more than 20</div>) : ""}
            {(error === 'numbers') ? (<div className="alert alert-danger">The password should contain numbers too</div>) : ""}
            {(error === 'lettersP') ? (<div className="alert alert-danger">The password should contain letters too</div>) : ""}
            {(error === 'lettersU') ? (<div className="alert alert-danger">The username should contain letters too</div>) : ""}
            {(error === 'lettersN') ? (<div className="alert alert-danger">The nickname should contain letters too</div>) : ""}

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
}


// var hiddenElements1 = document.getElementsByClassName('hidden1');
// var flag = 1;
// // show the errors in the invalid cases
// if (registerPassword.length < 4 || registerPassword.length > 20) {
//     //
//     console.log("passworddd");
//     hiddenElements1[2].style.display = 'block';
//     flag = 0;
//     return 0;
// }
// if (registerPassword.length < 4 || registerPassword.length > 20) {
//     //
//     console.log("passworddd");
//     setError('1');
//     flag = 0;
//     return 0;
// }
// var regExpLetters = /[a-zA-Z]/g;
// if (!regExpLetters.test(registerPassword)) {
//     //
//     console.log("letters");
//     hiddenElements1[2].style.display = 'block';
//     flag = 0;
//     return 0;
// }
// var regExpNumbers = /[0-9]/g;
// if (!regExpNumbers.test(registerPassword)) {
//     //
//     console.log("numbers");
//     hiddenElements1[2].style.display = 'block';
//     flag = 0;
//     return 0;
// }
