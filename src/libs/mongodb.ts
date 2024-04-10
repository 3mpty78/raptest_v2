import mongoose from "mongoose";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URI: string;
        }
    }
}

const connectMongoDB = () => {
    try {
        const uri = process.env.DB_URI;
        mongoose.connect(uri);
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;
