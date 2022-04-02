import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from './Input';

export default function Register() {
    let navigate = useNavigate();

    const resetHidden = () => {
        var hiddenElements = document.getElementsByClassName('hidden');
        for (var i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].style.display = 'none';
        }
    }

    const showHidden = () => {
        var inputs = document.getElementsByTagName('input');
        var hiddenElements = document.getElementsByClassName('hidden');
        for (var i = 0; i < inputs.length - 1; i++) {
            if (inputs[i].value.length == 0) {
                hiddenElements[i].style.display = 'block';
                return 0;
            }
        }
        return 1;
    }

    const register = (event) => {
        event.preventDefault();
        resetHidden();
        if (showHidden()) {
            navigate("/");
        }
    }

    return (
        <form action="" className='cube center-form'>
            <h1>Register Now!</h1>
            <hr></hr>
            <Input inputName="Username" inputType="text" />
            <Input inputName="Nickname" inputType="text" />
            <Input inputName="Password" inputType="password" />
            <div>
                <input type="submit" value="Register" className="btn" onClick={register}></input>
                Already registered? <Link to="/">Click Here</Link> to login
            </div>
        </form>
    )
}
