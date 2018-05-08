const assert = require("assert");
const _ = require("lodash");

function genUID() {
  return Math.floor(Math.random() * 100000000);
}

let users = {
  10000001: {
    username: "bob",
    password: "a5sf54sf45as65f4a4f5a5sdf45ad5",
    itemsListed: [23423],
    transactions: [23424234234, 2342342],
    sessionId: 0000000000,
    signupDate: 12546845,
    description: "this is my profile, it is a string",
    lastLoginDate: 175654646
  }
};

let login = (username, password, sessionId) => {
  return {
    status: true,
    sessionId: 000000001,
    userId: 000000002,
    reason: "Login Successful!"
  };
};

let register = (username, password, sessionId) => {
  username = username.toLowerCase();
  let usernames = _.map(users, "username");
  let userDoesExist = usernames.some(x => x === username);
  let userId = Math.max(Object.keys(users)) + 1;

  if (userDoesExist) {
    return {
      status: false,
      reason: "Username already exists!"
    };
  }

  if (!userDoesExist) {
    users[userId] = {
      username: username,
      password: password,
      itemsListed: [],
      transactions: [],
      sessionId: sessionId,
      signupDate: Date.now(),
      description: "",
      lastLoginDate: Date.now()
    };
    return {
      status: true,
      sessionId: sessionId,
      userId: userId,
      reason: "Registration Successful"
    };
  }

  return {
    status: false,
    reason: "Unknown Error!"
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
