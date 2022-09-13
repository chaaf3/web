const express = require('express');
const router = express.Router();
const xss = require('xss');
const path = require('path');


  const constructorMethod = (app) => {
    app.get('/', function (request, response) {
      response.sendFile(path.join(__dirname, '../views/main.html'));
    });
  
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;