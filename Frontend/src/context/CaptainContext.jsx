/*import React, { createContext, useState, useContext } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// export const useCaptain = () => {
//     const context = useContext(CaptainContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// }

// Create a provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to update captain details
    const updateCaptain = (newCaptainData) => {
        setCaptain(CaptainData);
    };

    const value = {
        captain,
        setCaptain,
        setIsLoading,
        setError,
        updateCaptain,
        isLoading,
        error,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
};

export default CaptainContext;
*/


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CaptainDataContext = createContext();

const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // On mount, re-fetch captain details using the token from localStorage
    useEffect(() => {
        async function fetchCaptainData() {
            const token = localStorage.getItem('token');
            if (!token || token === "undefined") {
                // No token means user is not logged in; skip API call.
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                // Assuming response.data.captain holds the correct object
                setCaptain(response.data.captain);
            } catch (err) {
                // If unauthorized, clear the token to prevent further API calls
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                }
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCaptainData();
    }, []);

    // Direct update function using the provided parameter
    const updateCaptain = (newCaptainData) => {
        setCaptain(newCaptainData);
    };

    // Render children only when data has loaded
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error fetching captain data.</div>;
    }

    const value = {
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        error,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainProvider;