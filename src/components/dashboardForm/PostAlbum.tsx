"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../app/dashboard/dashboard.module.scss";

interface Artist {
    name: string;
}

interface Track {
    title: string;
    lyrics: string[];
}

const PostAlbum = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [cover, setCover] = useState<File | null>(null);
    const [tracks, setTracks] = useState<Track[]>([
        { title: "", lyrics: [""] },
    ]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCover(file);
        }
    };

    const handleArtistSelection = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedArtist(e.target.value);
    };

    const handleTrackChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedTracks: any = [...tracks];
        updatedTracks[index][name] = value;
        setTracks(updatedTracks);
    };

    const handleLyricsChange = (
        trackIndex: number,
        lyricIndex: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = e.target;
        const updatedTracks = [...tracks];
        updatedTracks[trackIndex].lyrics[lyricIndex] = value;
        setTracks(updatedTracks);
    };

    const handleAddTrack = () => {
        setTracks([...tracks, { title: "", lyrics: [""] }]);
    };

    const handleAddLyric = (index: number) => {
        const updatedTracks = [...tracks];
        updatedTracks[index].lyrics.push("");
        setTracks(updatedTracks);
    };

    const handleRemoveLyric = (trackIndex: number, lyricIndex: number) => {
        const updatedTracks = [...tracks];
        updatedTracks[trackIndex].lyrics.splice(lyricIndex, 1);
        setTracks(updatedTracks);
    };

    const handleRemoveTrack = (index: number) => {
        const updatedTracks = [...tracks];
        updatedTracks.splice(index, 1);
        setTracks(updatedTracks);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("artist", selectedArtist);
            if (cover) {
                formData.append("cover", cover);
            }
            formData.append("tracks", JSON.stringify(tracks));

            const response = await fetch("/api/albums", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Projet ajouté chef !");
                setSelectedArtist("");
                setTitle("");
                setCover(null);
                setTracks([{ title: "", lyrics: [""] }]);
            } else {
                console.error(
                    "Erreur lors de l'ajout de l'artiste :",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Erreur lors de la requête POST :", error);
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch("/api/artists");
                const data: Artist[] = await response.json();
                setArtists(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArtists();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.selector}>
                <select
                    onChange={handleArtistSelection}
                    name="artists"
                    id="artists">
                    {artists.map((artist, index) => (
                        <option value={artist.name} key={index}>
                            {artist.name}
                        </option>
                    ))}
                </select>
            </div>
            <label htmlFor="projectName">Titre du projet</label>
            <input
                type="text"
                id="projectName"
                value={title}
                onChange={handleChange}
            />
            <label htmlFor="projectCover">Cover du projet</label>
            <input
                type="file"
                id="projectCover"
                accept="image/*"
                onChange={handleImageChange}
                required
            />
            {tracks.map((track, index) => (
                <div className={styles.tracks} key={index}>
                    <label htmlFor={`trackTitle${index}`}>
                        Titre de la piste {index + 1}
                    </label>
                    <input
                        type="text"
                        id={`trackTitle${index}`}
                        name="title"
                        value={track.title}
                        onChange={(e) => handleTrackChange(index, e)}
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveTrack(index)}>
                        Supprimer la piste
                    </button>
                    <button type="button" onClick={() => handleAddLyric(index)}>
                        Ajouter lyrics
                    </button>
                    {track.lyrics.map((lyric, lyricIndex) => (
                        <div key={lyricIndex}>
                            <label htmlFor={`lyric${index}${lyricIndex}`}>
                                Lyrics {lyricIndex + 1}
                            </label>
                            <input
                                type="text"
                                id={`lyric${index}${lyricIndex}`}
                                value={lyric}
                                onChange={(e) =>
                                    handleLyricsChange(index, lyricIndex, e)
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveLyric(index, lyricIndex)
                                }>
                                Supprimer lyrics
                            </button>
                        </div>
                    ))}
                </div>
            ))}
            <button type="button" onClick={handleAddTrack}>
                Ajouter une piste
            </button>
            <button type="submit">Poster le projet</button>
        </form>
    );
};

export default PostAlbum;
