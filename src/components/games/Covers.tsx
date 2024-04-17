"use client";
import { useEffect, useState } from "react";
import styles from "../../app/[artistId]/games/blindtest/blindtest.module.scss";
import Answers from "./Answers";
import Image from "next/image";
import data from "../../../public/artistsData.json";

const Covers = ({ artistId }: { artistId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [goodArtist, setGoodArtist] = useState<string>("");
    const [randomCover, setRandomCover] = useState<string>("");
    const [selectedAlbumData, setSelectedAlbumData] = useState<any>();
    const [goodAnswer, setGoodAnswer] = useState<string>("");
    const [badAnswers, setBadAnswers] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const selectedArtist = data.find(
                (artist) => artist._id.toString() === artistId
            );
            if (!selectedArtist) return;

            const associatedAlbums = selectedArtist?.albums;

            setGoodArtist(selectedArtist.name);

            // CREATION RANDOM INDEX
            const generateRandomIndex = Math.floor(
                Math.random() * associatedAlbums.length
            );
            const randomProject = associatedAlbums[generateRandomIndex];
            setSelectedAlbumData(randomProject);

            setGoodAnswer(randomProject.title);
            setRandomCover(randomProject.cover);

            // CREATIONS DES REPONSES
            const threeBadAnswers = associatedAlbums
                .filter((album) => album.title !== goodAnswer)
                .slice(0, 3)
                .map((album) => album.title);
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
                <div className={styles.coverContainer}>
                    <figure className={styles.filteredCover}>
                        <Image src={randomCover} alt="Random cover" fill />
                    </figure>
                    <Answers
                        artist={goodArtist}
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
