require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());



const users = [
    {id: 1, name: "Gold", age: 20},
    {id: 2, name: "Minhaj", age: 22},
    {id: 3, name: "Rakib", age: 25}
];


app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    res.json(user);
})

app.get("/", (req, res) =>{
    res.json([
        {name: "Gold", age: 20},
        {name: "minhaj", age: 220}
    ])
})

app.get("/about", (req, res)=>{
    res.send("This is about page - updated!")
} )

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
});

let usersCollection;
async function run() {
    await client.connect();
    const db = client.db('mydatabase');
    usersCollection = db.collection('users');
    console.log('Connected to MongoDB!');

    


}

app.get('/allUsers', async (req, res) => {
    console.log('db-users route hit!');
        const users = await usersCollection.find().toArray();
        res.json(users);
    });

    app.get('/test', (req, res) => {
    res.json({message: "test works!"});
});


run();


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
