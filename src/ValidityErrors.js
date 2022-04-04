import React from 'react'

export default function GetErrorEmptyCase({inputName}) {
    switch (inputName) {
        case 'Username':
            return 'This username is already in use, please choose other'
        case 'Password':
            return 'This password is too short, please choose password includes at least 5 character'
        case 'Nickname':
        default:
            return 'Missing content'
    }
}