import "@/app/_styles/globals.css";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import Header from "./_components/Header";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap"
});

export const metadata = {
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
            <body
                className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col `}
            >
                <Header />
                <div className="flex-1 px-8 py-12 grid ">
                    <main className="max-w-7xl mx-auto w-full">{children}</main>
                </div>
            </body>
        </html>
    );
}
