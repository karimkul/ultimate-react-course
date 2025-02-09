import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
    const navigate = useNavigate();

    // Use useSearchParams hook to get the search params
    const [searchParams, setSearchParams] = useSearchParams();

    // Retrieve the lat and lng values from the URL
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <h1>Map</h1>
            <h1>
                Position: {lat}, {lng}
            </h1>
            <button onClick={() => setSearchParams({ lat: 23, lng: 15 })}>
                Change Position
            </button>
        </div>
    );
}

export default Map;
