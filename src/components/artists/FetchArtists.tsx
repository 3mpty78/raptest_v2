"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./artistList.module.scss";

interface Artist {
    _id: string;
    name: string;
    imageUrl: string;
}

const FetchArtists = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch("/api/artists");
                const data = await response.json();
                setArtists(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArtists();
    }, []);

    return (
        <div className={styles.grid}>
            {isLoading && (
                <div className={styles.loadingScreen}>
                    Chargement des artistes ...
                </div>
            )}
            {artists.map((artist) => (
                <Link
                    href={`/${artist._id}/games`}
                    target="_top"
                    key={artist._id}
                    className={styles.card}>
                    <div className={styles.artistImage}>
                        <Image src={artist.imageUrl} alt={artist.name} fill />
                    </div>
                    <p>{artist.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default FetchArtists;
