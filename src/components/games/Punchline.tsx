"use client";
import { fetchAlbums } from "@/app/functions/fetchAlbums";
import { fetchArtists } from "@/app/functions/fetchArtists";
import { useEffect, useState } from "react";
import styles from "../../app/[artistId]/games/blindtest/blindtest.module.scss";
import Answers from "./Answers";
import data from "../../../public/artistsData.json";
interface Artist {
    _id: string;
    name: string;
    picture: string;
    albums: [
        title: string,
        cover: string,
        tracks: [title: string, lyrics: [string]]
    ];
}
interface Album {
    title: string;
    cover: string;
    tracks: [{ title: string; lyrics: string[] }];
}

const Punchline = ({ artistId }: { artistId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [goodArtist, setGoodArtist] = useState<string>("");
    const [randomPunchline, setRandomPuncline] = useState<string>("");
    const [selectedAlbumData, setSelectedAlbumData] = useState<any>();
    const [goodAnswer, setGoodAnswer] = useState<string>("");
    const [badAnswers, setBadAnswers] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const selectedArtist = data.find(
                (artist) => artist._id === artistId
            );
            if (!selectedArtist) {
                return;
            }
            setGoodArtist(selectedArtist?.name);
            const allArtistAlbums = selectedArtist?.albums;

            // CREATION RANDOM INDEX
            const createRandomIndex = Math.floor(
                Math.random() * selectedArtist?.albums.length
            );

            const randomProject = selectedArtist.albums[createRandomIndex];
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
            if (!allArtistAlbums) return;
            const allTracks = allArtistAlbums.flatMap((album) => album.tracks);
            const threeBadAnswers = allTracks
                .filter((track) => track.title !== goodAnswer)
                .slice(0, 3)
                .map((track) => track.title);
            setBadAnswers(threeBadAnswers);

            // MASQUER L'ECRAN DE CHARGEMENT
            setIsLoading(false);
        }
    }, [artistId, goodAnswer]);

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
                        artist={goodArtist}
                    />
                </>
            )}
        </>
    );
};

export default Punchline;
