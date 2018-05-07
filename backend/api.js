const alibay = require("./alibay.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.raw({ type: "*/*" }));

app.post("/login", (req, res) => {
  let body = req.body.toString();
  console.log(body)
  let parsedBody = JSON.parse(body);
  console.log(parsedBody)
  let username = parsedBody.username;
  let password = parsedBody.password;
  res.send(JSON.stringify(alibay.login(username, password)));
});

app.post("/register", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let username = parsedBody.username;
  let password = parsedBody.password;
  res.send(JSON.stringify(alibay.register(username, password)));
});

app.get("/allItems", (req, res) => {
  console.log("HEY")
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
  res.send(JSON.stringify(alibay.buy(itemId, quantity)));
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
  let itemTitle = parsedBody.itemTitle;
  let itemDescription = parsedBody.itemDescription;
  let quantity = parsedBody.quantity;
  let sellerId = parsedBody.sellerId;
  res.send(
    JSON.stringify(
      alibay.addItem(itemTitle, itemDescription, quantity, sellerId)
    )
  );
});

app.post("/user", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let userId = parsedBody.userId;
  res.send(JSON.stringify(alibay.user(userId)));
});

app.listen(4000, () => console.log("Listening on port 4000!"));
