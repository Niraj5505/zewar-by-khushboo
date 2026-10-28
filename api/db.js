import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://nirajth:Niraj%40123@cluster0.la5bw0i.mongodb.net/zewarbykhusboo';

let client;
let clientPromise;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function getDb(dbName = 'zewarbykhusboo') {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;
