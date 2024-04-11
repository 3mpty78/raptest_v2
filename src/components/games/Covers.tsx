"use client";
import { fetchAlbums } from "@/app/functions/fetchAlbums";
import { fetchArtists } from "@/app/functions/fetchArtists";
import { useEffect, useState } from "react";
import styles from "../../app/[artistId]/games/blindtest/blindtest.module.scss";
import Answers from "./Answers";
import Image from "next/image";

interface Artist {
    _id: string;
    name: string;
}
interface Album {
    artist: string;
    title: string;
    imageUrl: string;
}

const Covers = ({ artistId }: { artistId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allArtists, setAllArtists] = useState<Artist[]>([]);
    const [allAlbums, setAllAlbums] = useState<Album[]>([]);
    const [randomCover, setRandomCover] = useState<string>("");
    const [selectedAlbumData, setSelectedAlbumData] = useState<Album>();
    const [goodAnswer, setGoodAnswer] = useState<string>("");
    const [badAnswers, setBadAnswers] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // FETCH ARTISTS
            const { artistsData } = await fetchArtists();
            setAllArtists(artistsData);

            // FETCH ALBUMS
            const { albumsData } = await fetchAlbums();
            setAllAlbums(albumsData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (allArtists.length > 0 && allAlbums.length > 0) {
            const selectedArtist = allArtists.find(
                (artist) => artist._id.toString() === artistId
            );
            const associatedAlbums = allAlbums.filter(
                (album) => album.artist === selectedArtist?.name
            );

            // CREATION RANDOM INDEX
            const generateRandomIndex = Math.floor(
                Math.random() * associatedAlbums.length
            );
            const randomProject = associatedAlbums[generateRandomIndex];
            setSelectedAlbumData(randomProject);

            setGoodAnswer(randomProject.title);
            setRandomCover(randomProject.imageUrl);

            // CREATIONS DES REPONSES
            const threeBadAnswers = associatedAlbums
                .filter((album) => album.title !== goodAnswer)
                .slice(0, 3)
                .map((album) => album.title);
            setBadAnswers(threeBadAnswers);

            // MASQUER L'ECRAN DE CHARGEMENT
            setIsLoading(false);
        }
    }, [allArtists, allAlbums, artistId, goodAnswer]);

    return (
        <>
            {isLoading && (
                <div className={styles.loadingScreen}>Chargement ...</div>
            )}
            {selectedAlbumData && (
                <div className={styles.coverContainer}>
                    <figure className={styles.filteredCover}>
                        <Image src={randomCover} alt="Random cover" fill />
                    </figure>
                    <Answers
                        badAnswers={badAnswers}
                        goodAnswer={goodAnswer}
                        projectData={selectedAlbumData}
                    />
                </div>
            )}
        </>
    );
};

export default Covers;
