import React from 'react'

export default function GetError({ inputName }) {
    switch (inputName) {
        case 'Username':
            return 'Please enter a Username'
        case 'Password':
            return 'Please enter a Password'
        case 'Nickname':
            return 'Please enter a Nickname'
        default:
            return 'Missing content'
    }
}
