import Link from "next/link";
import React from "react";

interface Links {
    name: string;
    path: string;
}

const navlinks: Links[] = [
    { name: "Accueil", path: "/" },
    { name: "Artistes", path: "/artists" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    {navlinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.path} target="_top">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
