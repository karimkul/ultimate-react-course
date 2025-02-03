import { useEffect, useReducer } from "react";
import Headers from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
    questions: [],
    // "loading","error","ready","active","finish"
    status: "loading"
};

function reducer(state, action) {
    switch (action.type) {
        case "dataRecieved":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            };
        case "dataFailed":
            return {
                ...state,
                status: "error"
            };
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;

    useEffect(() => {
        fetch("http://localhost:9000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataRecieved", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    }, []);

    return (
        <div className="app">
            <Headers />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen numQuestions={numQuestions} />
                )}
            </Main>
        </div>
    );
}
