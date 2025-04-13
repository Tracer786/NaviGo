import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/userlogin");
                }
            } catch (error) {
                console.error("Logout failed:", error.message);
                navigate("/userlogin"); // Redirect to login even if logout fails
            }
        };

        logout();
    }, [token, navigate]);

    return <div>Logging out...</div>;
};

export default UserLogout;