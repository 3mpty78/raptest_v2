"use client";
import { fetchAlbums } from "@/app/functions/fetchAlbums";
import { fetchArtists } from "@/app/functions/fetchArtists";
import { useEffect, useState } from "react";
import styles from "../../app/[artistId]/games/blindtest/blindtest.module.scss";
import Answers from "./Answers";

interface Track {
    title: string;
    lyrics: [string];
}
interface Artist {
    _id: string;
    name: string;
}
interface Album {
    artist: string;
    title: string;
    imageUrl: string;
    tracks: [{ title: string; lyrics: string[] }];
}

const Punchline = ({ artistId }: { artistId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allArtists, setAllArtists] = useState<Artist[]>([]);
    const [allAlbums, setAllAlbums] = useState<Album[]>([]);
    const [randomPunchline, setRandomPuncline] = useState<string>("");
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
            const associatedProject = allAlbums.filter(
                (album) => album.artist === selectedArtist?.name
            );

            // CREATION RANDOM INDEX
            const generateRandomIndex = Math.floor(
                Math.random() * associatedProject.length
            );
            const randomProject = associatedProject[generateRandomIndex];
            setSelectedAlbumData(randomProject);

            // RECUPERATION RANDOM TRACK
            const randomTrackIndex = Math.floor(
                Math.random() * randomProject.tracks.length
            );

            // CREATION RANDOM PUNCHLINE
            const randomPunchlineIndex = Math.floor(
                Math.random() *
                    randomProject.tracks[randomTrackIndex].lyrics.length
            );
            const randomPunchline =
                randomProject.tracks[randomTrackIndex].lyrics[
                    randomPunchlineIndex
                ];
            setGoodAnswer(randomProject.tracks[randomTrackIndex].title);
            setRandomPuncline(randomPunchline);

            // CREATIONS DES REPONSES
            const allTracks = associatedProject.flatMap(
                (album) => album.tracks
            );
            const threeBadAnswers = allTracks
                .filter((track) => track.title !== goodAnswer)
                .slice(0, 3)
                .map((track) => track.title);
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
                <>
                    <h3>{randomPunchline}</h3>
                    <Answers
                        badAnswers={badAnswers}
                        goodAnswer={goodAnswer}
                        projectData={selectedAlbumData}
                    />
                </>
            )}
        </>
    );
};

export default Punchline;
