import React from 'react';
import { useState } from 'react';

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState("Use Name");
    return this;
}
