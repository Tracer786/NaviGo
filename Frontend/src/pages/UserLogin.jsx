import React, { use, useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
    // perform 2 way binding
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password,
        })
        console.log(userData);
        setEmail("");
        setPassword("");
    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-13" src="/images/NaviGo_Logo.png" alt="NaviGo_Logo.png" />
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input required className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" type="email" placeholder="email@example.com" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input required className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" type="password" placeholder="password" value={password} onChange={(e)=> 
                        {
                            setPassword(e.target.value);
                        }
                    }/>
                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Login</button>
                </form>
                <p className="text-center">New Here?
                    <Link to='/UserSignup' className="text-blue-600">Create new Account</Link>
                </p>
            </div>
            <div>
                <Link to='/CaptainLogin' className="bg-[green] text-white flex items-center justify-center font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign In as Captain</Link>
            </div>
        </div>
    );
}

export default UserLogin;