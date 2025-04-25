import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Start from "./pages/Start";
import UserLogout  from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import {UserDataContext}  from "./context/UserContext";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import 'remixicon/fonts/remixicon.css';

const App = () => {
    // const ans = UserContext(UserDataContext)
    // console.log(ans)
    return (
        <div>
            {/* creating routes */}
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/riding" element={<Riding />} />
                <Route path="/usersignup" element={<UserSignup />} />
                <Route path="/captainlogin" element={<CaptainLogin />} />
                <Route path="/captainsignup" element={<CaptainSignup />} />
                <Route path="/captainriding" element={<CaptainRiding />} />
                <Route path="/home" element={
                    <UserProtectWrapper>
                        <Home />
                    </UserProtectWrapper>
                } />
                <Route path="/userlogout" element={
                    <UserProtectWrapper>
                        <UserLogout/>
                    </UserProtectWrapper>
                } />
                <Route path ="/captainhome" element ={
                    <CaptainProtectWrapper>
                        <CaptainHome />
                    </CaptainProtectWrapper>
                } />
                {/* <Route path="/usersignup" element={<UserSignup />} /> */}
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
}
    
export default App;