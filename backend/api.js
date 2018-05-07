const alibay = require('./alibay')
const express = require('express')
const app = express()

app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});

app.listen(3000, () => console.log('Listening on port 3000!'))
