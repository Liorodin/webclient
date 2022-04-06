import React from 'react'
import { users } from './db/users';

export default function GetUser(userName) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == userName) {
            return users[i];
        }
    }
    return {
        username: 'not found',
        nickname: 'not found',
        password: null,
    }
}
