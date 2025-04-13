import React, { createContext, useState, useContext } from 'react';

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
        setCaptain(captainData);
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
 