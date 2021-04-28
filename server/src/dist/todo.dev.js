"use strict";

var _require = require('nanoid'),
    nanoid = _require.nanoid;

module.exports = function (app, db) {
  app.get('/todos/:token/todo/', function (req, res) {
    var token = req.params.token;
    var data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
    return res.send(data.todoLists[token].todos);
  });
  app.post('/todos/:token/todo/', function (req, res) {
    var token = req.params.token;
    var todo = {
      title: req.body.title,
      id: nanoid(),
      completed: false
    };
    var data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
    console.log(JSON.stringify(data));
    data.todoLists[token].todos.push(todo);
    db.set(req.session.uuid, data);
    return res.send(todo);
  });
  app.patch('/todos/:token/todo/:id', function (req, res) {
    var token = req.params.token;
    var id = req.params.id;
    var data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
    var todos = data.todoLists[token].todos;
    var index = todos.findIndex(function (todo) {
      return todo.id == id;
    });
    var completed = Boolean(req.body.completed);

    if (index > -1) {
      todos[index].completed = completed;
    }

    db.set(req.session.uuid, data);
    return res.send(todos[index]);
  });
  app["delete"]('/todos/:token/todo/:id', function (req, res) {
    var token = req.params.token;
    var id = req.params.id;
    var data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
    var todos = data.todoLists[token].todos;
    var index = todos.findIndex(function (todo) {
      return todo.id == id;
    });

    if (index > -1) {
      todos.splice(index, 1);
    }

    db.set(req.session.uuid, data);
    res.send(todos);
  });
};