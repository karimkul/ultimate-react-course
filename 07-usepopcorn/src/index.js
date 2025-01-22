import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StartRating from "./starRating";

function Star() {
    const [movieRating, setMovieRating] = useState(0);
    return (
        <div>
            <StartRating
                color="blue"
                maxRating={10}
                onSetRating={setMovieRating}
            />
            <p>This movie was rated {movieRating} stars</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <StartRating
            maxRating={5}
            messages={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
        />
        <StartRating size={12} color="red" className="test" defaultRating={3} />

        <Star />
    </React.StrictMode>
);
