import { MongoClient } from "mongodb";

const url = 
    `mongodb+srv://${process.env.DB_USER}:${
        process.env.DB_USER_PASSWORD
    }@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = client.db("main");

    return { 
        listings: db.collection("test_listings")
    };
};