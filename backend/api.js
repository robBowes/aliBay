const alibay = require("./alibay.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sha = require('sha1');

app.use(bodyParser.raw({ type: "*/*" , limit: '20mb'}));

app.use(express.static('data/images'))

app.post("/login", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let username = parsedBody.username;
  let password = sha(parsedBody.password);
  let sessionId = sha(Math.random()*1000000)
  res.set('Set-Cookie', sessionId);
  res.send(JSON.stringify(alibay.login(username, password, sessionId)));
});

app.post("/register", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let username = parsedBody.username;
  let password = sha(parsedBody.password);
  let sessionId = sha(Math.random()*1000000)
  console.log("PARSED USER", parsedBody.username)
  res.set('Set-Cookie', sessionId);
  res.send(JSON.stringify(alibay.register(username, password, sessionId)));
});

app.get("/allItems", (req, res) => {
  res.send(JSON.stringify(alibay.allItems()));
});

app.post("/item", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let itemId = parsedBody.itemId;
  res.send(JSON.stringify(alibay.item(itemId)));
});

app.post("/buy", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let itemId = parsedBody.itemId;
  let quantity = parsedBody.quantity;
  let sessionId = req.headers.cookie;
  res.send(JSON.stringify(alibay.buy(itemId, quantity, sessionId)));
});

app.post("/search", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let query = parsedBody.query;
  res.send(JSON.stringify(alibay.search(query)));
});

app.put("/addItem", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let itemName = parsedBody.itemName;
  let itemDescription = parsedBody.itemDescription;
  let quantity = parsedBody.quantity;
  let sellerId = parsedBody.sellerId;
  let price = parsedBody.price;
  let filename = parsedBody.filename;
  let sessionId = req.headers.cookie;
  sellerId = parseInt(sellerId)
  res.send(
    JSON.stringify(
      alibay.addItem(itemName, itemDescription, quantity, sellerId, price, sessionId, filename)
    )
  );
});

app.post("/user", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let userId = parsedBody.userId;
  let sessionId = req.headers.cookie;
  userId = parseInt(userId)
  res.send(JSON.stringify(alibay.user(userId, sessionId)));
});

app.post("/transactions", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let txs = parsedBody.txs;
  let sessionId = req.headers.cookie;
  res.send(JSON.stringify(alibay.getTransactions(txs, sessionId)));
});

app.post('/pic', (req, res) => {
  let extension = req.query.ext.split('.').pop();
  let randomString = '' +  Math.floor(Math.random() * 10000000)
  let randomFilename = randomString + '.' + extension
  let sessionId = req.headers.cookie;
  let sendBack = {status: true, content: './data/images/'+randomFilename}
  alibay.images(req.body, randomFilename, sessionId)
  .then(x => res.send(sendBack));
})

app.listen(4000, () => console.log("Listening on port 4000!"));
