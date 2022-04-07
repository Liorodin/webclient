import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import React, { useState, useEffect } from 'react';
import UserView from "./UserView"

export default function App() {
    const [currentUser, setCurrentUser] = useState("default user");
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    }, [currentUser])
    
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Login setFunc={setCurrentUser} />}></Route>*/}
                <Route path="/" element={<Login setCurrentUser={setCurrentUser}/>}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />}></Route>
                <Route path="/chartview" element={<UserView currentUser={currentUser} />}></Route>
            </Routes>
        </Router>
    );
}