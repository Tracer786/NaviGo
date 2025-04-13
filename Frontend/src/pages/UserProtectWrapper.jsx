import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // console.log(token);

    useEffect(() => {
        if (!token) {
            navigate("/userlogin");
        }
    }, [token, navigate]);

    return <>{children}</>;
}

export default UserProtectWrapper;
// This component checks if the user is logged in. If not, it redirects them to the login page. If they are logged in, it renders the children components.