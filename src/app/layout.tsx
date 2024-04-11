import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

export const metadata: Metadata = {
    title: "RAPTEST",
    description:
        "Test tes connaissances des textes de tes rappeurs préférés avec ce blindtest revisité !",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <body>
                <header>
                    <Navbar />
                </header>
                {children}
            </body>
        </html>
    );
}
