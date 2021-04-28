"use strict";

var _require = require('nanoid'),
    nanoid = _require.nanoid;

module.exports = function (app, db) {
  app.get('/todos/', function (req, res) {
    //return overview of all todo lists
    return res.send(db.get(req.session.uuid));
  });
  app.post('/todos', function (req, res) {//add new todo list
  });
  app.patch('/todos/:id', function (req, res) {//update todo list
  });
  app["delete"]('/todos/:id', function (req, res) {//remove todo list
  });
};