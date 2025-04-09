import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";

const App = () => {
    return (
        <div>
            {/* creating routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/usersignup" element={<UserSignup />} />
                <Route path="/captainlogin" element={<CaptainLogin />} />
                <Route path="/captainsignup" element={<CaptainSignup />} />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
}
    
export default App;