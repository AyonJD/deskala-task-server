const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require('bcrypt');

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

        const db = client.db("Deskala");
        const userCollection = db.collection("users")

        // API to Run Server 
        app.get("/", async (req, res) => {
            res.send("Server is Running");
        });

        // API to Get All Users
        app.get("/users", async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        }
        );

        //API to create a new user
        app.put("/users", async (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const number = req.body.number;
            hashPass = await bcrypt.hash(password, 10);
            const registeredUser = await userCollection.insertOne({ email, password: hashPass, number });
            // console.log(registeredUser);

            res.send(registeredUser);
        }
        );
    }
    finally {
        // client.close(); 
    }
}

run().catch(console.dir);

app.listen(port, () => console.log(`Listening on port ${port}`));