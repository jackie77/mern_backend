import mongoose from 'mongoose';



export const connectDB = async () => {
    console.log("connect DB", process.env.MONGO_URI)
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB conected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.mongoose}`);
        process.exit(1); // process code 1 means exit with failure, 0 means success
    }
}