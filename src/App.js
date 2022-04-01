import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import './App.css';
import { useState } from 'react';
import ChartView from "./ChatView"
import React from 'react'

export default function App() {
    const [currentUser, setCurrentUser] = useState("User Name");

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login setFunc={setCurrentUser} />}></Route>               
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/chartview" element={<ChartView currentUser={currentUser}/> }></Route>
                </Routes>
            </Router>
        </div>
    );
}