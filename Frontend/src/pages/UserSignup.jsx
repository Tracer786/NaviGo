import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
    // perform 2 way binding
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            username: {
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            password: password
        })
        console.log(userData);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-13"
                    src="/images/NaviGo_Logo.png"
                    alt="NaviGo_Logo.png"
                />
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h3 className="text-lg font-medium mb-2">What's your name</h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <input
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
            />
                    </div>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input
                        required
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) =>
                            {
                                setPassword(e.target.value);
                            }
                        }
                    />
                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                        Login
                    </button>
                </form>
                <p className="text-center">
                    Already have a account?
                    <Link to="/UserLogin" className="text-blue-600">
                        Login here
                    </Link>
                </p>
            </div>
            <div>
                <p className='text-xs leading-tight'>
                    Consent.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
