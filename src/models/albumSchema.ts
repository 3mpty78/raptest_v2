import mongoose, { Schema } from "mongoose";

interface Track {
    title: string;
    lyrics: string[];
}

interface Album extends Document {
    artist: string;
    title: string;
    cover: {
        data: Buffer;
        contentType: string;
    };
    tracks: Track[];
}

const albumSchema = new Schema({
    artist: String,
    title: String,
    cover: {
        data: Buffer,
        contentType: String,
    },
    tracks: [{ title: String, lyrics: [String] }],
});

const AlbumModel =
    mongoose.models.Album || mongoose.model("Album", albumSchema);

export default AlbumModel;
