import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

let isConnected = false;

export async function dbConnect() {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = db.connections[0].readyState == 1;
        console.log("Connected to MongoDB", db);

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}