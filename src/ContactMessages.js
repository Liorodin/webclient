import React from 'react'
import { messages } from './db/messages';

export default function ContactMessages(firstName, secondName) {
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].contacts.includes(firstName) && messages[i].contacts.includes(secondName)) {
            return messages[i].list;
        }
    }
    return [];
}
