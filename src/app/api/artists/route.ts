import connectMongoDB from "@/libs/mongodb";
import ArtistModel from "@/models/artistSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        connectMongoDB();
        const artists = await ArtistModel.find();
        const artistsWithImageUrl = artists.map((artist) => ({
            _id: artist._id,
            name: artist.name,
            imageUrl: `data:${artist.image.contentType};base64, ${artist.image.data}`,
        }));
        return NextResponse.json(artistsWithImageUrl);
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
        const name = formData.get("name") as string;
        const image = formData.get("image") as Blob;

        const buffer = await image.arrayBuffer();
        const bsonImage = Buffer.from(buffer).toString("base64");

        connectMongoDB();

        const _id = new mongoose.Types.ObjectId();
        const artist = new ArtistModel({
            _id,
            name,
            image: { data: bsonImage, contentType: image.type },
        });

        try {
            const savedArtist = await artist.save();
            const imageUrl = savedArtist.image;
            return NextResponse.json(
                { message: "Artiste ajouté", imageUrl },
                { status: 201 }
            );
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'artiste :", error);
            return NextResponse.json(
                { message: "Erreur lors de l'ajout de l'artiste" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'artiste :", error);
        return NextResponse.json(
            { message: "Erreur lors de l'ajout de l'artiste" },
            { status: 500 }
        );
    }
}
