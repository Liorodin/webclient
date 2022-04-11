import React from 'react'

export default function ValidityErrors({ inputName }) {
    switch (inputName) {
        case 'Username':
            return 'This username is already in use, please choose other name'
        case 'Password':
            return 'This password is too short, please choose password includes at least 4 character and not more than 20'
        // case 'Password2':
        //         return 'The password should contain letters too'
        // case 'Password3':
        //         return 'The password should contain numbers too'
        case 'Nickname':
        default:
            return 'Missing content'
    }
}