const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://taskData:EnsvcHwV2eQfmsf7@cluster0.y4mhh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    }
    finally {
        // client.close(); 
    }
}

run().catch(console.dir);

app.listen(port, () => console.log(`Listening on port ${port}`));