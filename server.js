const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('donateDB'); // Database name
        const collection = database.collection('donations'); // Collection name

        app.post('/submit-form', async (req, res) => {
            const donationData = req.body;

            const result = await collection.insertOne(donationData);

            console.log(`New donation inserted with _id: ${result.insertedId}`);
            res.status(200).send({ message: 'Data saved successfully!' });
        });

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
