const assert = require("assert");

function genUID() {
  return Math.floor(Math.random() * 100000000);
}

let login = (username, password) => {
  return {
    status: true,
    sessionId: 000000001,
    reason: "Login Successful!"
  };
};

let register = (username, password) => {
  return {
    status: true,
    sessionId: 000000001,
    reason: "Registration Successful!"
  };
};

let allItems = () => {
  return {
    status: true,
    content: {
      69769860: {
        itemName: "Red Bike",
        itemDescription:
          "works great 2015 model selling because I bought a new one. I have 2 for sale",
        sellerName: "Bobert Dobert",
        price: 60,
        quantity: 2,
        sellerId: 869868,
        listDate: 1519216899934
      },
      12536858: {
        itemName: "2017 Corvette Z06",
        itemDescription:
          "My midlife crisis is over sweet car but now I have to live a boring life also I got a DUI",
        sellerName: "Aubrey Drake Graham Jr",
        price: 50000,
        quantity: 1,
        sellerId: 896070,
        listDate: 1519211899934
      },
      76976990: {
        itemName: "left shoe",
        itemDescription:
          "Selling because I lost the right one its an original Air Yeezy worth $4000 for the pair so this is a bargain",
        sellerName: "Slim Jimmy",
        price: 300,
        quantity: 1,
        sellerId: 658791,
        listDate: 1519211809934
      }
    }
  };
};
let item = itemId => {
  return {
    itemName: "right shoe",
    itemDescription:
      "Stole the right shoe of a pair of original air Yeezy's from some chump so I'm selling it",
    sellerName: "Swae Lee",
    price: 250,
    quantity: 1,
    sellerId: 769769,
    listDate: 1519215809934
  };
};

let buy = (itemId, quantity) => {
  return {
    status: true,
    reason: "purchase successful"
  };
};
let search = query => {
  return {
    status: true,
    content: {
      69769860: {
        itemName: "Red Bike",
        itemDescription:
          "works great 2015 model selling because I bought a new one. I have 2 for sale",
        sellerName: "Bobert Dobert",
        price: 60,
        quantity: 2,
        sellerId: 869868,
        listDate: 1519216899934
      },
      76976990: {
        itemName: "left shoe",
        itemDescription:
          "Selling because I lost the right one its an original Air Yeezy worth $4000 for the pair so this is a bargain",
        sellerName: "Slim Jimmy",
        price: 300,
        quantity: 1,
        sellerId: 658791,
        listDate: 1519211809934
      }
    }
  };
};

let addItem = (itemName, itemDescription, quantity, sellerId, price) => {
  return {
    status: true,
    reason: "Item Successfully Listed!"
  };
};

let user = userId => {
  return {
    username: "Bobert",
    itemsListed: [69769860],
    transactions: [76976990],
    description: "Hello I like to sell but also buy"
  };
};

module.exports = {
  genUID,
  login,
  register,
  allItems,
  item,
  buy,
  search,
  addItem,
  user
};
