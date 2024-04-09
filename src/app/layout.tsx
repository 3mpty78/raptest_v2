import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "RAPTEST",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>
                <header>
                    <Navbar />
                </header>
                {children}
            </body>
        </html>
    );
}
