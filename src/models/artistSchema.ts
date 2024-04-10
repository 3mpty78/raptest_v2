import mongoose, { Schema } from "mongoose";

const artistSchema = new Schema({
    _id: String,
    name: String,
    image: {
        data: Buffer,
        contentType: String,
    },
});

const ArtistModel =
    mongoose.models.Artist || mongoose.model("Artist", artistSchema);

export default ArtistModel;
