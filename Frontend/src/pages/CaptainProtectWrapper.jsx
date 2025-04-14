import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // console.log(token);
    const {captain, setCaptain} = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/captainlogin");
        }
    }, [token, navigate]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        if(response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            setIsLoading(false);
        }
    })
    .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captainlogin");
    })

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return <>{children}</>;
}

export default CaptainProtectWrapper;
// This component checks if captain is logged in. If not, it redirects them to the login page. If they are logged in, it renders the children components.
// It uses the CaptainDataContext to access the captain data and setCaptain function.
// The token is stored in local storage and is used to check if the captain is logged in. If the token is not present, the captain is redirected to the login page. Otherwise, the children components are rendered.
// The useEffect hook is used to check the token and navigate to the login page if necessary. The children components are rendered inside a fragment (<>...</>) to avoid adding an extra div to the DOM.
