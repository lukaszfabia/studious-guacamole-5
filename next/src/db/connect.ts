import { MongoClient, Db } from "mongodb";


let client: MongoClient | null = null;
let db: Db | null = null;

const connectToDatabase = async () => {
    if (client && db) {
        return { client, db };
    }

    try {
        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
        const db = client.db(process.env.MONGODB_DB);
        return { client, db };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect with db');
    }
};

export { connectToDatabase };