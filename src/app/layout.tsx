import type { Metadata, Viewport } from "next";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";

const APP_NAME = "Raptest";
const APP_DESCRIPTION =
    "Test tes connaissances des textes de tes rappeurs préférés avec ce blindtest revisité !";
const APP_TITLE_TEMPLATE = "%s - Raptest";
const IMAGE_URL =
    "https://raptest.vercel.app/_next/image?url=%2Fimg%2Fillustrations%2Fmeta_banner.png&w=640&q=75";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_NAME,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_NAME,
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: APP_NAME,
        description: APP_DESCRIPTION,
        images: IMAGE_URL,
    },
    twitter: {
        card: "summary",
        title: APP_NAME,
        description: APP_DESCRIPTION,
        images: IMAGE_URL,
    },
};

export const viewport: Viewport = {
    themeColor: "#252525",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="./img/logo/icon-192x192.png" />
            </head>
            <body>
                <header>
                    <Navbar />
                </header>
                {children}
            </body>
        </html>
    );
}
