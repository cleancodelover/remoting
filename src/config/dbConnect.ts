import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise && mongoose?.connect) {
    cached.promise = mongoose?.connect(MONGO_URI).then((mongooseInstance) => mongooseInstance.connection) as any;
  }

  cached.conn = await cached.promise as any;
  return cached.conn;
}

export default dbConnect;
