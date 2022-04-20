import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ResetHidden from './ResetHidden';
import ShowHidden from './ShowHidden';
import Input from './Input';
import { users } from '../db/users';
import { contactsList } from '../db/contactsList';
import $ from 'jquery';

{/* <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js">
</script> */}


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
        var registerPicture = document.getElementById("profile").value;
        var newUser = {
            username: registerUser,
            nickname: registerNickname,
            password: registerPassword,
            passwordVerification: registerPasswordVerification,
            picture: registerPicture,
        }
        //////////////////////////////////////
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



    function humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if (bytes < thresh) return bytes + " B";
        var units = si
            ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
            : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (bytes >= thresh);
        return bytes.toFixed(1) + " " + units[u];
    }

    //this function is called when the input loads an image
    function renderImage(file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var the_url = event.target.result;
            $("#preview").html("<img src='" + the_url + "' />");
            $("#name").html(file.name);
            $("#size").html(humanFileSize(file.size, "MB"));
            $("#type").html(file.type);
            $("#post-btn").click(function() {
                var img = document.getElementById("profile");
                img.src = the_url;
                //$("#img").src(the_url);
            });
        };
        //when the file is read it triggers the onload event above.
        reader.readAsDataURL(file);
    }

    //watch for change on the file field
    $("#the-photo-file-field").change(function () {
        console.log("photo file has been chosen");
        //grab the first image in the fileList (there is only one)        
        console.log(this.files[0].size);
        renderImage(this.files[0]);
        //AddNewPicture(this.files[0]);
    });


    // function AddNewPicture(file) {
    //     var reader = new FileReader();
    //     reader.onload = function (event) {
    //         var url = event.target.result;
    //         //$("#img").src(url);
    //         var img = document.getElementById("profile");
    //         img.src = url;
    //     }
    //     reader.readAsDataURL(file);
    // }

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
                    {/* <a id="imgLink" href="contactImage.webp"> */}
                    <img id="profile" src="contactImage.webp" data-bs-toggle="modal" data-bs-target="#addPicture-modal"></img>
                    {/* </a> */}
                    <Input inputName="Username" inputType="text" text='Username' />
                    <Input inputName="Nickname" inputType="text" text='Nickname' />
                    <Input inputName="Password" inputType="password" text='Password' />
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
                        
                        <input type="file" id="the-photo-file-field"></input>
                        <div id="preview"></div>
                        <div id="data" className="large-8 columns">
                            <p id="name"></p>
                            <p id="size"></p>
                            <p id="type"></p>
                        </div>

                        <div className="modal-footer">
                            {/* onClick={() => AddNewPicture(setOpenChatCount)} */}
                            <button id="post-btn" type="button" className="btn btn-primary" data-bs-dismiss="modal" >Add now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
