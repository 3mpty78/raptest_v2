import Link from "next/link";
import React from "react";

const GameCard = ({
    title,
    link,
    artistId,
    description,
}: {
    title: string;
    link: string;
    artistId: string;
    description: string;
}) => {
    return (
        <Link href={`/${artistId}/games/${link}`} target="_top">
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
};

export default GameCard;
