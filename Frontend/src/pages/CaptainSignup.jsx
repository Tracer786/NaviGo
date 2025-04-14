import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { locals } from '../../../Backend/app';

const CaptainSignup = () => {

    const navigate = useNavigate();
    // perform 2 way binding
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [vehicleColor, setVehicleColor] = useState("");
        const [vehiclePlate, setVehiclePlate] = useState("");
        const [vehicleCapacity, setVehicleCapacity] = useState("");
        const [vehicleType, setVehicleType] = useState("");
        const [userData, setUserData] = useState({});
        const {captain, setCaptain} = React.useContext(CaptainDataContext);
    
        const submitHandler = async (e) => {
            e.preventDefault();
            const captainData = {
                fullName: {
                    firstName: firstName,
                    lastName: lastName,
                },
                email: email,
                password: password,
                vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    type: vehicleType,
                },
            }
            // console.log(userData);

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captainhome');
            }
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setVehicleColor("");
            setVehiclePlate("");
            setVehicleCapacity("");
            setVehicleType("");
        }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-13"
                    src="/images/NaviGo_Captain_Logo.png"
                    alt="NaviGo_Logo.png"
                />
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
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
                    <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
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
                    <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="text"
                            placeholder="Vehicle Plate"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-4 mb-7'>
                        <select
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                        <input
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="number"
                            placeholder="Vehicle Capacity"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                        Create Captain Account
                    </button>
                </form>
                <p className="text-center">
                    Already have a account?
                    <Link to="/CaptainLogin" className="text-blue-600">
                        Login here
                    </Link>
                </p>
            </div>
            <div>
                <p className='text-xs leading-tight'>
                    This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply.</span>
                </p>
            </div>
        </div>
    );
}

export default CaptainSignup;
