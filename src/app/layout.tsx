import type { Metadata, Viewport } from "next";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";

const APP_NAME = "Raptest";
const APP_DESCRIPTION =
    "Test tes connaissances des textes de tes rappeurs préférés avec ce blindtest revisité !";
const APP_TITLE_TEMPLATE = "%s - Raptest";
const IMAGE_URL =
    "https://ogcdn.net/2c2c6737-47d4-4459-9969-e711eb48394c/v1/raptest.vercel.app/Raptest/Test%20tes%20connaissances%20des%20textes%20de%20tes%20rappeurs%20pr%C3%A9f%C3%A9r%C3%A9s%20avec%20ce%20blindtest%20revisit%C3%A9%20!/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fecd174a6-123a-4487-9f72-2c702d4ec70c.jpg%3Ftoken%3D7iLDyNXzAUtcdo-aRJdldHW-CPKcfF_lHfwf6yQA3ec%26height%3D800%26width%3D1200%26expires%3D33249389526/og.png";

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
                {/* <meta property="og:title" content="Raptest" />
                <meta property="og:site_name" content="Raptest" />
                <meta property="og:url" content="https://raptest.vercel.app" />
                <meta
                    property="og:description"
                    content="Test tes connaissances des textes de tes rappeurs préférés avec ce blindtest revisité !"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://ogcdn.net/c078a98b-9a33-4eaf-a5cf-e5ebf3ea450c/v1/raptest.vercel.app/Raptest/Test%20tes%20connaissances%20des%20textes%20de%20tes%20rappeurs%20pr%C3%A9f%C3%A9r%C3%A9s%20avec%20ce%20blindtest%20revisit%C3%A9%20!/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Ff2f67fad-38cf-4ed7-8a03-64582a2eb9c0.jpg%3Ftoken%3DKfG5r6wVrp4KWgeiqnEdPxLH6d5DRapjqO6vZlSG8uM%26height%3D675%26width%3D1200%26expires%3D33249390372/og.png"
                /> */}
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
