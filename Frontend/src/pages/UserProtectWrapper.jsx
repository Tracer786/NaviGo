import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    // console.log(token);

    useEffect(() => {
        if (!token) {
            navigate("/userlogin");
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            if(response.status === 200) {
                const data = response.data;
                setUser(data.user);
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            localStorage.removeItem("token");
            navigate("/userlogin");
        })

    }, [token, navigate]);

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return <>{children}</>;
}

export default UserProtectWrapper;
// This component checks if the user is logged in. If not, it redirects them to the login page. If they are logged in, it renders the children components.