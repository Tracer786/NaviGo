import React,  { use, useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
    // perform 2 way binding
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [captainData, setCaptainData] = useState('');
        const submitHandler = (e) => {
            e.preventDefault();
            setCaptainData({
                email: email,
                // password: password,
                password
            })
            console.log(captainData);
            setEmail("");
            setPassword("");
        }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="/images/NaviGo_Captain_Logo.png" alt="NaviGo_Logo.png" />
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
                <p className="text-center">Join a fleet?
                    <Link to='/CaptainSignup' className="text-blue-600">Register as a Captain</Link>
                </p>
            </div>
            <div>
                <Link to='/UserLogin' className="bg-[#d5622d] text-white flex items-center justify-center font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign In as User</Link>
            </div>
        </div>
    );
}

export default CaptainLogin;