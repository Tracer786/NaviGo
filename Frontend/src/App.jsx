import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Start from "./pages/Start";
import {UserDataContext}  from "./context/UserContext";
import UserProtectWrapper from "./pages/UserProtectWrapper";

const App = () => {
    // const ans = UserContext(UserDataContext)
    // console.log(ans)
    return (
        <div>
            {/* creating routes */}
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/usersignup" element={<UserSignup />} />
                <Route path="/captainlogin" element={<CaptainLogin />} />
                <Route path="/captainsignup" element={<CaptainSignup />} />
                <Route path="/home" element={
                    <UserProtectWrapper>
                        <Home />
                    </UserProtectWrapper>
                } />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
}
    
export default App;