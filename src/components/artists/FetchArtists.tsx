"use client";
import React, { useEffect, useState } from "react";
import styles from "./artistList.module.scss";
import { fetchArtists } from "../../app/functions/fetchArtists";
import Link from "next/link";
import Image from "next/image";

interface Artist {
    _id: string;
    name: string;
    imageUrl: string;
}
interface Album {
    artist: string;
    title: string;
    imageUrl: string;
    tracks: [{ title: string; lyrics: string[] }];
}

export const FetchArtists = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { artistsData } = await fetchArtists();
                setArtists(artistsData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.grid}>
            {isLoading && (
                <div className={styles.loadingScreen}>Chargement ...</div>
            )}
            {!isLoading &&
                artists.map((artist) => (
                    <Link
                        href={`/${artist._id}/games`}
                        target="_top"
                        key={artist._id}
                        className={styles.card}>
                        <div className={styles.artistImage}>
                            <Image
                                src={artist.imageUrl}
                                alt={artist.name}
                                fill
                            />
                        </div>
                        <p>{artist.name}</p>
                    </Link>
                ))}
        </div>
    );
};

export default FetchArtists;
