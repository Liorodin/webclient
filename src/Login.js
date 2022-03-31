import React from 'react'
import { Link } from "react-router-dom";
import Input from './Input'

export default function Login() {
    return (
        <form action="" className='cube'>
            <h1>Shirin's and Leonardo's WebClient</h1>
            <Input inputName="Username" inputType="text" />
            <Input inputName="Password" inputType="password" />
            <Link to="/">
                <input type="submit" value="Log In" className="login"></input>
            </Link>
            <div>
                Not registered? <Link to="/register">Click here</Link> to register
            </div>
        </form>
    )
}
