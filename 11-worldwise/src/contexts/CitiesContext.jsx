// import { createContext, useContext, useEffect, useState } from "react";

// const BASE_URL = "http://localhost:9000";

// const CitiesContext = createContext();

// function CitiesProvider({ children }) {
//     const [cities, setCities] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(function () {
//         async function fetchCitiese() {
//             try {
//                 const res = await fetch(`${BASE_URL}/cities`);
//                 const data = await res.json();
//                 setCities(data);
//             } catch (err) {
//                 alert("There was some an error loading data...");
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//         fetchCitiese();
//     }, []);
//     return (
//         <CitiesContext.Provider value={{ cities, isLoading }}>
//             {children}
//         </CitiesContext.Provider>
//     );
// }

// function useCities() {
//     const context = useContext(CitiesContext);
//     if (context === undefined)
//         throw new Error("CitiesContext was used outside the CitiesProvider");

//     return context;
// }

// export { CitiesProvider, useCities };

import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                if (!res.ok) throw new Error("Failed to fetch cities");
                const data = await res.json();
                setCities(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    const value = { cities, isLoading, error };

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}

export { CitiesProvider, useCities };
