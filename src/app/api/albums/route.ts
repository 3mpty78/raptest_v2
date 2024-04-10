import connectMongoDB from "@/libs/mongodb";
import AlbumModel from "@/models/albumSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        connectMongoDB();
        const albums = await AlbumModel.find();
        const albumWithCover = albums.map((album) => ({
            _id: album._id,
            artist: album.artist,
            title: album.title,
            imageUrl: `data:${album.cover.contentType};base64, ${album.cover.data}`,
            tracks: album.tracks,
        }));
        return NextResponse.json(albumWithCover);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Erreur lors de la récupération des artistes" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const artist = formData.get("artist") as string;
        const title = formData.get("title") as string;
        const cover = formData.get("cover") as Blob;
        const tracksJSONString = formData.get("tracks") as string;
        const tracks = JSON.parse(tracksJSONString) as {
            title: string;
            lyrics: string[];
        }[];

        const buffer = await cover.arrayBuffer();
        const bsonImage = Buffer.from(buffer).toString("base64");

        connectMongoDB();

        const _id = new mongoose.Types.ObjectId();
        const albumTracks = tracks.map((track) => ({
            title: track.title,
            lyrics: track.lyrics,
        }));

        const project = new AlbumModel({
            _id,
            artist,
            title,
            cover: { data: bsonImage, contentType: cover.type },
            tracks: albumTracks,
        });

        try {
            project.save();
            return NextResponse.json(
                { message: "Album ajouté" },
                { status: 201 }
            );
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'album :", error);
            return NextResponse.json(
                { message: "Erreur lors de l'ajout de l'album" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'album :", error);
        return NextResponse.json(
            { message: "Erreur lors de l'ajout de l'album" },
            { status: 500 }
        );
    }
}
