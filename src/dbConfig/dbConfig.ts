import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection; 

        connection.on("connected", () => {
            console.log("Mongoose connection established");
        })

        connection.on("error", (error) => {
            console.error("Mongoose connection error: ", error);
            process.exit(1);
        })

    } catch (error) {
        console.log("Error connecting to database: ", error);
        console.error("Error connecting to database: ", error);
    }
}