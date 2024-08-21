import exp from 'constants';
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cachedConnection: MongooseConnection = (global as any).mongoose;

if (!cachedConnection) {
  cachedConnection = (global as any) = {
    connection: null,
    promise: null,
  };
}

export const connectToDatabse = async () => {
  if (cachedConnection.connection) {
    return cachedConnection.connection;
  }

  if (!MONGODB_URL) {
    throw new Error('MongoDB URL is not provided');
  }

  cachedConnection.promise = cachedConnection.promise ||
  mongoose.connect(MONGODB_URL, {
    dbName: 'NovaImage',
    bufferCommands: false
  });

  cachedConnection.connection = await cachedConnection.promise;

  return cachedConnection.connection;
}