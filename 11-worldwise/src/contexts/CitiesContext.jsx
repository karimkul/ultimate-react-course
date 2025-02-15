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
    // const [error, setError] = useState(null);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);

                if (!res.ok) throw new Error("Failed to fetch cities");
                const data = await res.json();

                setCities(data);
            } catch (err) {
                alert(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);

            if (!res.ok) throw new Error("Failed to fetch cities");
            const data = await res.json();

            setCurrentCity(data);
        } catch (err) {
            alert("There was an error loading data...");
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            setCities((cities) => [...cities, data]);
        } catch (err) {
            alert("There was an error creating city...");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });

            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch (err) {
            alert("There was an error deleting city...");
        } finally {
            setIsLoading(false);
        }
    }

    const value = {
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
    };

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
