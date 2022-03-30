import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import './registerDesign.css';


const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </Router>
        </div>
    );
}
export default App;