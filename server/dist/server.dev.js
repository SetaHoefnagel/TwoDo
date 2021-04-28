"use strict";

/**
 * This is just a mock server in order to test the frontend. 
 * The actual backend should be made in Django, with proper user authentication.
 */
var express = require('express');

var dotenv = require('dotenv');

var colors = require('colors');

var cors = require('cors');

var _require = require('body-parser'),
    json = _require.json;

var _require2 = require('nanoid'),
    nanoid = _require2.nanoid;

var uuid = require('uuid');

var JSONdb = require('simple-json-db');

var db = new JSONdb('./database.json');
var account_db = new JSONdb('./account_database.json');

var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);

var todo = require('./src/todo');

var todos = require('./src/todos');

dotenv.config({
  path: './config.env'
});
var app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(json());
app.set('trust proxy', 1);
app.use(session({
  secret: '.',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: new Date(Date.now() + 60 * 1000 * 30)
  }
}));
app.use(function (req, res, next) {
  console.log(req.session);

  if (!req.session.uuid) {
    req.session.uuid = uuid.v4();
    var _todo = {
      id: nanoid(),
      title: 'todo item 1',
      completed: true
    };
    var todoList = {
      title: 'todo list 1',
      sharedWith: [],
      todos: [_todo]
    };
    var user = {
      username: '',
      password: '',
      uuid: req.session.uuid
    };
    db.set(req.session.uuid, {
      todoLists: [todoList]
    }); // default todo data

    account_db.set(user.uuid, user);
  }

  next();
});
todo(app, db);
todos(app, db);
var PORT = 3001;
app.listen(PORT, console.log("Server running on port ".concat(PORT).green.bold));