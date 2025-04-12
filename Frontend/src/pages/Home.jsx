import React from "react";

const Home = () => {
    return (
        <div className="bg-cover bg-bottom bg-[url(/images/Home_Image.jpg)] h-screen pt-8 flex justify-between flex-col w-full">
            <img className="w-16 ml-8" src="/images/NaviGo_Logo.png" alt="NaviGo_Logo.png" />
            <div className="bg-white pb-7 py-4 px-4">
                <h2 className="text-2xl font-bold">Get Started with NaviGo</h2>
            </div>
        </div>
    );
}

export default Home;