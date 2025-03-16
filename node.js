const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // Connect to your specific database
    const db = client.db("myDatabase"); // replace 'myDatabase' with your database name

    // Connect to your specific collection
    const collection = db.collection("myCollection"); // replace 'myCollection' with your collection name

    // Example operation: Insert a document
    const result = await collection.insertOne({ name: "Test Document" });
    console.log(`Inserted document with _id: ${result.insertedId}`);
  } finally {
    // Ensure client closes the connection
    await client.close();
  }
}

connectToDB().catch(console.error);
