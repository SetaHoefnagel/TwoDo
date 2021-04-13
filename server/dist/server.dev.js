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

var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);

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
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  console.log(req.session);

  if (!req.session.uuid) {
    req.session.uuid = uuid.v4();
    db.set(req.session.uuid, [{
      id: nanoid(),
      title: 'todo 1',
      completed: true
    }, {
      id: nanoid(),
      title: 'todo 2',
      completed: false
    }, {
      id: nanoid(),
      title: 'todo 3',
      completed: false
    }, {
      id: nanoid(),
      title: 'todo 4',
      completed: false
    }, {
      id: nanoid(),
      title: 'todo 5',
      completed: false
    }]); // default todo data
  }

  next();
});
app.get('/todos', function (req, res) {
  return res.send(db.get(req.session.uuid));
});
app.post('/todos', function (req, res) {
  var todo = [{
    title: req.body.title,
    id: nanoid(),
    completed: false
  }];
  return res.send(db.get(req.session.uuid));
});
app.patch('/todos/:id', function (req, res) {
  var id = req.params.id;
  var index = db.get(req.session.uuid).findIndex(function (todo) {
    return todo.id == id;
  });
  var completed = Boolean(req.body.completed);

  if (index > -1) {
    todos[index].completed = completed;
  }

  return res.send(todos[index]);
});
app["delete"]('/todos/:id', function (req, res) {
  var id = req.params.id;
  var todos = db.get('todos');
  var index = todos.findIndex(function (todo) {
    return todo.id == id;
  });

  if (index > -1) {
    todos.splice(index, 1);
  }

  db.set('todos', todos);
  res.send(todos);
});
var PORT = 3001;
app.listen(PORT, console.log("Server running on port ".concat(PORT).green.bold));