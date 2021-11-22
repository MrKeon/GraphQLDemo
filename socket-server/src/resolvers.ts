import fetch from "node-fetch";

const data = require('data.json');
const database = JSON.parse(data);

import { Collection, MongoClient } from "mongodb";

const DB_NAME = "scrapes";
const COLLECTION_NAME = "queries";
const uri = "mongodb+srv://admin:T!nder4news@cluster0.5ktd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export const resolvers = {
    Query: {
        hello: async (args: any) => 
        {
            if(database[args]) {
                return database[args];
            }
            return "Hi Rachel, love of my life!"
            // await setTimeout(() => {return 'world'}, 5000);
        }, 
        source: async (parent: any, args: any, context: any, info: any) => {
            const url = args.url;
            let source;
            client.connect(() => {
                const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
                // perform actions on the collection object
                source = collection.find(url);
                if (!source) {
                    fetch(url)
                    .then(res => res.json())
                    .then(result => {
                        collection.insertOne({ url, result })
                    });
                }
            });
            
            return await fetch(url);
        }
    },
};