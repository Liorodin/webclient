import React from 'react'
import { Link } from "react-router-dom";
import Input from './Input';

export default function Register() {
    return (
        <div className='cube'>
            <h1>Register</h1>
            <Input inputName="Username" inputType="text" />
            <Input inputName="Nickname" inputType="text" />
            <Input inputName="Password" inputType="password" />
            <Link to="/register">
                <input type="submit" value="Register" className="register"></input>
            </Link>
            <div>
                Already registered? <Link to="/">Click Here</Link> to login
            </div>
        </div>
    )
}
