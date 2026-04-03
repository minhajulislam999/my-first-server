const express = require('express');



const app = express();

const cors = require('cors');

app.use(cors());



const users = [
    {id: 1, name: "Gold", age: 20},
    {id: 2, name: "Minhaj", age: 22},
    {id: 3, name: "Rakib", age: 25}
];

app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    res.json(user);
})

app.get('/users', (req, res) => {
    res.json(users);
});

app.get("/", (req, res) =>{
    res.json([
        {name: "Gold", age: 20},
        {name: "minhaj", age: 220}
    ])
})

app.get("/about", (req, res)=>{
    res.send("This is about page - updated!")
} )

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
