const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 16;



function check(username) {
  if (typeof username != "string") throw new error("bad inputs");
  for(let i in username) {
    if(username[i] == ' ') {
      throw new error("bad inputs");
    }
  }
  if (username.length < 4) {
    throw new error("bad inputs");
  }
  return true;
}

function checkPassword(password) {
  if (typeof password != "string") throw new error("bad inputs");
  for(let i in password) {
    if(password[i] == ' ') {
      throw new error("bad inputs");
    }
  }
  if (password.length < 6) {
    throw new error("bad inputs");
  }
  return true;
}

async function createUser(username, password) {
  if(!username || !password) {
    throw new error("bad inputs");
  }
  if(check(username) && checkPassword(password)) {
    userName = username.toLowerCase();
  }
  let userCollection = await users();
  const userList = await userCollection.find({'username': userName}).toArray();
  if(userList.length != 0) {
    throw new error("username already exists")
  }
  
  let newPassword = await bcrypt.hash(password, saltRounds);

  let newUser = {
    username: userName,
    password: newPassword
  };
  
  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount == 0) {
    throw new error("this didn't work");
  }
  else {
    return  {userInserted: true}
  }
}


async function checkUser(username, password) {
  let userName = "";

  if(!username || !password) {
    throw new error("bad inputs");
  }


  if(check(username) && checkPassword(password)) {
    userName = username.toLowerCase();
  }


  let userCollection = await users();
  const userList = await userCollection.find({'username': userName}).toArray();



  if(userList.length != 1) {
    throw new error("Either the username or password is invalid");
  }


  let comparePasswords = await bcrypt.compare(password, userList[0].password);


  if (comparePasswords) {
    return {'authenticated': true};
  }
  else {
    throw new error("Either the username or password is invalid");
  }

}

module.exports = {checkUser, createUser};