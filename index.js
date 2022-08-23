const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors());
app.use(cors(corsOptions));

app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.clptnjl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();

        const usersCollection = client.db("user-form").collection("users");

        app.get('/userinfo', async (req, res) => {
            const users = await usersCollection.find().toArray();
            console.log(users);

            res.send(users);
        })

        app.post('/userinfo', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersCollection.insertOne(newUser);

            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Running User Form Server");
})

app.listen(port, () => {
    console.log("User Form Server is running");
})