import mongoose, { Connection, ConnectOptions } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

const options: ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env file"
    );
  }
}

async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully");
        return mongooseInstance.connection;
      })
      .catch((error: Error) => {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("MongoDB disconnected");
  }
}

export function isConnected(): boolean {
  return cached.conn !== null && mongoose.connection.readyState === 1;
}

export default connectDB;
