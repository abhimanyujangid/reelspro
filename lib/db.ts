import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("No MONGODB_URI found in env. Please add it to your .env file");
}

// Declare a global variable that will be used to store the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectionToDatabase(){

    // If the connection exists, return it
    if(cached.conn){
        return cached.conn
    }

    // If the connection is not already being made, make a new one

    // bufferCommands: true ka matlab hai ki agar database connection temporarily chala jaye, to Mongoose queries ko hold karke rakh lega aur jaise hi connection wapas aaye, unhe execute kar dega.

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        }
    
    // Store the connection promise in the global variable
    cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then(()=> mongoose.connection);
    }


    try {
        cached.conn = await cached.promise;
    } catch (error: any) {
        cached.promise = null;
        throw new Error('Error connecting to database', error);
    }

    return cached.conn;
}