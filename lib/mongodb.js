// import 'dotenv/config';
// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please add MONGODB_URI to your .env.local file');
// }

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     console.log('✅ Already connected to MongoDB');
//     return;
//   }
//   await mongoose.connect(MONGODB_URI);
//   console.log('✅ Connected to MongoDB successfully');
// };

// export default connectDB;


import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}