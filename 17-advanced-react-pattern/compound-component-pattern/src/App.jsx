import { useState } from "react";
import Counter from "./Counter";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Compound Component Pattern</h1>
            {/* <Counter
          iconIncrease="+"
          iconDecrease="-"
          label="My NOT so flexible counter"
          hideLabel={false}
          hideIncrease={false}
          hideDecrease={false}
          positionCount="top"
        /> */}
            <Counter>
                <Counter.Decrease icon="-" />
                <Counter.Count />
                <Counter.Increase icon="+" />
                <Counter.Label>My super flexiable counter</Counter.Label>
            </Counter>
            <div>
                <Counter>
                    <Counter.Decrease icon="❌" />
                    <Counter.Count />
                    <Counter.Increase icon="✅" />
                </Counter>
            </div>
        </div>
    );
}

export default App;
