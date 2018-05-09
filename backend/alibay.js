const assert = require('assert');
const _ = require('lodash');
// const mongoose = require('mongoose');
// const url = 'http://localhost:50216';
// mongoose.connect(url);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });


let users = {
  10000001: {
    username: 'bob',
    password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
    itemsListed: [23423],
    transactions: [23424234234, 2342342],
    sessionId: 1,
    signupDate: 12546845,
    description: 'this is my profile, it is a string',
    lastLoginDate: 175654646,
  },
  10000002: {
    username: 'glob',
    password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
    itemsListed: [23423],
    transactions: [23424234234, 2342342],
    sessionId: 1,
    signupDate: 12546845,
    description: 'this is my profile, it is a string',
    lastLoginDate: 175654646,
  },
};

let items = {
  20000001: {
    itemDescription: 'sample',
    itemName: 'some name',
    price: 12312.12,
    quantity: 10,
    listDate: 713649819,
    sellerId: 10000002,
  },
  20000002: {
    itemName: 'Red Bike',
    itemDescription:
      'works great 2015 model selling because I bought a new one. I have 2 for sale',
    sellerName: 'Bobert Dobert',
    price: 60,
    quantity: 2,
    sellerId: 869868,
    listDate: 1519216899934,
  },
  20000003: {
    itemName: '2017 Corvette Z06',
    itemDescription:
      'My midlife crisis is over sweet car but now I have to live a boring life also I got a DUI',
    sellerName: 'Aubrey Drake Graham Jr',
    price: 50000,
    quantity: 1,
    sellerId: 896070,
    listDate: 1519211899934,
  },
  20000004: {
    itemName: 'left shoe',
    itemDescription:
      'Selling because I lost the right one its an original Air Yeezy worth $4000 for the pair so this is a bargain',
    sellerName: 'Slim Jimmy',
    price: 300,
    quantity: 1,
    sellerId: 658791,
    listDate: 1519211809934,
  },
};

let transactions = {
  30000001: {
    sellerId: 10000001,
    buyerId: 10000002,
    itemId: 20000002,
    quantity: 2,
    price: 123.5,
  },
};

let login = (username, password, sessionId) => {
  username = username.toLowerCase();
  let userId = _.findKey(users, (x) => x['username'] === username);
  if (!userId) {
    return {
      status: false,
      reason: 'Username does not exist',
    };
  }
  if (users[userId]['password'] === password) {
    users[userId]['sessionId'] = sessionId;
    return {
      status: true,
      sessionId: sessionId,
      userId: userId,
      reason: 'Login Successful!',
    };
  }

  if (users[userId]['password'] !== password) {
    return {
      status: false,
      reason: 'Incorrect password.',
    };
  }

  return {
    status: false,
    reason: 'Unknown Error',
  };
};

let register = (username, password, sessionId) => {
  username = username.toLowerCase();
  let usernames = _.map(users, 'username');
  let userDoesExist = usernames.some((x) => x === username);
  let keys = Object.keys(users);
  let parsedKeys = keys.map((x) => parseInt(x));
  let maxKey = Math.max(...parsedKeys);
  let userId = maxKey + 1;

  if (userDoesExist) {
    return {
      status: false,
      reason: 'Username already exists!',
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
      description: '',
      lastLoginDate: Date.now(),
    };
    console.log(users);
    return {
      status: true,
      sessionId: sessionId,
      userId: userId,
      reason: 'Registration Successful',
    };
  }

  return {
    status: false,
    reason: 'Unknown Error!',
  };
};

let allItems = () => {
  return {
    status: true,
    content: items,
  };
};

let item = (itemId) => {
  if (!items[itemId]) {
    return {
      status: false,
      reason: 'itemId does not exist!',
    };
  }
  return {
    status: true,
    content: items[itemId],
  };
};

let buy = (itemId, quantity, sessionId) => {
  let sessions = _.map(users, 'sessionId');
  let sessionDoesExist = sessions.some((x) => x === sessionId);

  if (!items[itemId]) {
    return {
      status: false,
      reason: 'Invalid itemId',
    };
  }

  if (!sessionDoesExist) {
    return {
      status: false,
      reason: 'Invalid sessionId',
    };
  }

  let keys = Object.keys(transactions);
  let parsedKeys = keys.map((x) => parseInt(x));
  let maxKey = Math.max(...parsedKeys);
  let transactionId = maxKey + 1;
  let sellerId = items[itemId]['sellerId'];
  let buyerId = _.findKey(users, (x) => x['sessionId'] === sessionId);
  let price = items[itemId]['price'];

  transactions[transactionId] = {
    sellerId,
    buyerId,
    itemId,
    quantity,
    price,
  };

  items[itemId]['quantity'] = items[itemId]['quantity'] - 1;
  users[buyerId]['transactions'] = users[buyerId]['transactions'].concat(
    transactionId
  );
  users[sellerId]['transactions'] = users[sellerId]['transactions'].concat(
    transactionId
  );

  return {
    status: true,
    reason: 'purchase successful',
  };
};

let search = (query) => {
  let allItems = {...items};
  let filteredItems = _.pickBy(items, (x) =>
    x.itemName.toLowerCase().includes(query.toLowerCase())
  );

  return {
    status: true,
    content: filteredItems,
  };
};

let addItem = (
  itemName,
  itemDescription,
  quantity,
  sellerId,
  price,
  sessionId
) => {
  let keys = Object.keys(items);
  let parsedKeys = keys.map((x) => parseInt(x));
  let maxKey = Math.max(...parsedKeys);
  let itemId = maxKey + 1;
  let sessions = _.map(users, 'sessionId');
  let sessionDoesExist = sessions.some((x) => x === sessionId);

  if (!users[sellerId]) {
    return {
      status: false,
      reason: 'Invalid sellerId',
    };
  }
  let sellerName = users[sellerId]['username'];

  if (!sessionDoesExist) {
    return {
      status: false,
      reason: 'Invalid sessionId',
    };
  }

  items[itemId] = {
    itemName,
    itemDescription,
    quantity,
    sellerId,
    sellerName,
    price,
  };
  return {
    status: true,
    reason: 'Item Successfully Listed!',
  };
};

let user = (userId, sessionId) => {
  let sessions = _.map(users, 'sessionId');
  let sessionDoesExist = sessions.some((x) => x === sessionId);

  if (!(userId in users)) {
    return {
      status: false,
      reason: 'Invalid userId',
    };
  }
  console.log(sessionId);
  if (!sessionDoesExist) {
    return {
      status: false,
      reason: 'Invalid sessionId',
    };
  }
  let username = users[userId]['username'];
  let itemsListed = users[userId]['itemsListed'];
  let transactions = users[userId]['transactions'];
  let description = users[userId]['description'];

  if (userId in users && sessionDoesExist) {
    return {
      status: true,
      username,
      itemsListed,
      transactions,
      description,
    };
  }
  return {
    status: false,
    reason: 'unknown error',
  };
};

let getTransactions = (txs, sessionId) => {
  let sessions = _.map(users, 'sessionId');
  let sessionDoesExist = sessions.some((x) => x === sessionId);
  let filteredTransactions = txs.filter((x) => (transactions[x]))
  let outputObj = {status: true, content: {}}

  filteredTransactions.forEach((x) => {
    outputObj['content'][x] = transactions[x];
  });

  return outputObj;
};

module.exports = {
  login,
  register,
  allItems,
  item,
  buy,
  search,
  addItem,
  user,
  getTransactions,
};
