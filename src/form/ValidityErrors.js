
export function GetError({ inputName }) {
    switch (inputName) {
        case 'Username':
            return 'Please enter a Username'
        case 'Password':
            return 'Please enter a Password'
        case 'Nickname':
            return 'Please enter a Nickname'
        case 'Password Verification':
            return 'Please enter a Password Verification'
        default:
            return 'Missing content'
    }
}

export default function ValidityErrors({ inputName }) {
    switch (inputName) {
        case 'Username':
            return 'This username is already in use, please choose other name'
        case 'Password':
            return 'This password is too short, please choose password includes at least 4 character and not more than 20'
        case 'Nickname':
        default:
            return 'Missing content'
    }
}