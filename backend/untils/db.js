import mongoose from "mongoose";
import "dotenv/config"; // To use environment variables from .env

const URI = process.env.MONGODB_CONNECTION_STRING; // Make sure this is defined in your .env

const connectedDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectedDb;
