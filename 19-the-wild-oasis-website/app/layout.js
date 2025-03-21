import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";
export const metadata = {
    // title: "The Wild Oasis"
    title: {
        template: "%s / The Wild Oasis",
        default: "Welcome / The Wild Oasis"
    },
    description:
        "Luxorious cabin hotel, loacated in the heart of the Italian Dolomites, surrounded by beautiful mountaines and dark forests "
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-primary-950 text-primary-100 min-h-screen">
                <header>
                    <Logo />
                </header>

                <Navigation />
                <main>{children}</main>
                <footer>Copyrright by The Wild Oasis</footer>
            </body>
        </html>
    );
}
