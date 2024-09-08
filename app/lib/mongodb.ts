import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

console.log("conn url==", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define a MONGODB_URI");
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections from growing exponentially during API Route usage.
 */

let cached: any = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {};

      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        return mongoose;
      });

      cached.conn = await cached.promise;
      return cached.conn;
    }
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
