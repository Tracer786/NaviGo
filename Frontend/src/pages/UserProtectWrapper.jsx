import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        navigate("/userlogin");
    }

    return <>{children}</>;
}

export default UserProtectWrapper;
// This component checks if the user is logged in. If not, it redirects them to the login page. If they are logged in, it renders the children components.