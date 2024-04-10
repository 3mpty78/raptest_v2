"use client";
import { fetchAlbums } from "@/app/functions/fetchAlbums";
import { fetchArtists } from "@/app/functions/fetchArtists";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    const [allArtists, setAllArtists] = useState<Artist[]>([]);
    const [allAlbums, setAllAlbums] = useState<Album[]>([]);
    const [randomPunchline, setRandomPuncline] = useState<string>("");
    const [selectedAlbumData, setSelectedAlbumData] = useState<Album>();

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
            setRandomPuncline(randomPunchline);
        }
    }, [allArtists, allAlbums, artistId]);

    return (
        <>
            <div>{randomPunchline}</div>
            <Image
                src={selectedAlbumData?.imageUrl || ""}
                alt={`${selectedAlbumData?.title}'s cover`}
                width={100}
                height={100}
            />
        </>
    );
};

export default Punchline;
