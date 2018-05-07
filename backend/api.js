const alibay = require('./alibay')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});

app.get('/helloWorld', (req,res) => {
    res.send("<h1>HELLO WORLD</h1>")
})

app.get('/', (req, res) => {
    res.send("<h1>ALIBAY</h1>")
})

app.listen(3000, () => console.log('Listening on port 3000!'))
