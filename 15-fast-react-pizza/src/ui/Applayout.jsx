import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

function Applayout() {
    return (
        <div>
            <Header />
            <main>
                <h1>Main Content</h1>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    );
}

export default Applayout;
