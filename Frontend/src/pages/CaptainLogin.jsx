import React,  { use, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
    // perform 2 way binding
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const {captain, setCaptain} = React.useContext(CaptainDataContext);
        const navigate = useNavigate();
        // const [captainData, setCaptainData] = useState('');
        const submitHandler = async (e) => {
            e.preventDefault();
            // setCaptainData({

            const captain = {
                email: email,
                // password: password,
                password
            // })
            }
            // console.log(captainData);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captainhome');
            }
            // console.log(captainData);
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