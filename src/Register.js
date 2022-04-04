import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';
import Input from './Input';
import { users } from './users';

export default function Register() {
    let navigate = useNavigate();

    // const startHidden1 = () => {
    //     var hiddenElements1 = document.getElementsByClassName('hidden1');
    //     for (var i = 0; i < hiddenElements1.length; i++) {
    //         hiddenElements1[i].style.display = 'none';
    //     }
    // }

    // const showHidden1 = () => {
    //     var flag = 1;
    //     var inputs1 = document.getElementsByTagName('input');
    //     var hiddenElements1 = document.getElementsByClassName('hidden1');
    //     for (var i = 0; i < users.length; i++) {
    //         if (inputs1[i].value == users[i].username) {
    //             hiddenElements1[i].style.display = 'block';
    //             flag = 0;
    //         }
    //     }
    //     return flag;
    // }

    const register = (event) => {
        event.preventDefault();
        ResetHidden();
        //
       // startHidden1();
        // && showHidden1()
        if (ShowHidden()) {
            newRegister();
            console.log("Welcome new user!")
            //navigate("/");
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
        ////
        // for (var i = 0; i < users.length; i++) {
        //     if (registerUser == users[i].username) {
        //         //alert("This username is already in use, please choose other");
        //         throw 'This username is already in use, please choose other';
        //         //return;
        //     }
        //     if (registerPassword.length < 5) {
        //         alert("This password is too short, please choose password includes at least 5 characters");
        //         return;
        //     }
        // }

       // startHidden();
       // if(startHidden(registerUser)){
      
            var hiddenElements1 = document.getElementsByClassName('hidden1');
            for (var i = 0; i < hiddenElements1.length; i++) {
                hiddenElements1[i].style.display = 'none';
                return;
            }
            var flag = 1;
            //var inputs1 = document.getElementsByTagName('input');
            //var hiddenElements2 = document.getElementsByClassName('hidden1');
            for (var j = 0; j < users.length; j++) {
                if (registerUser == users[i].username) {
                    hiddenElements1[j].style.display = 'block';
                    flag = 0;
                    return;
                }
            }
           // if(flag){
            users.push(newUser);
          //  }
        }

        ///   

    }

    // let isExistedUser = false;


    // function startHidden(registerUser) {
        
    //     if (isExistedUser) {
    //         return 0;
    //     }

    //     for (var i = 0; i < users.length; i++) {
    //         if (registerUser == users[i].username) {
    //             isExistedUser = true;
    //             setError();
    //         }
    //     }
        
    //     // setError(()=> {
    //     //     document.getElementById("shortPassword").innerText = "This password is too short, please choose password includes at least 5 characters";
    //     //     isShortPassword = false;
    //     // })
    //     return 1;
    // }
    // function setError() {
    //     document.getElementById("existedUser").innerText = "This username is already in use, please choose other";
    //     isExistedUser = false;
    // }
//}
