import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="bg-cover bg-bottom bg-[url(/images/Home_Image.jpg)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
                <img className="w-16 ml-8" src="/images/NaviGo_Logo.png" alt="NaviGo_Logo.png" />
                <div className="bg-white pb-7 py-4 px-4">
                    <h2 className="text-2xl font-bold">Get Started with NaviGo</h2>
                    <Link to='/UserLogin'  className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link> 
                    
                </div>
            </div>
        </div>
    );
}

export default Home