"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.deleteTodo = exports.toggleComplete = exports.addTodo = exports.todoSlice = exports.deleteTodoAsync = exports.toggleCompleteAsync = exports.addTodoAsync = exports.getTodosAsync = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _nanoid = require("nanoid");

var _extraReducers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getTodosAsync = (0, _toolkit.createAsyncThunk)('todo/getTodosAsync', function _callee() {
  var resp, todos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('http://localhost:3001/todos', {
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 2:
          resp = _context.sent;

          if (!resp.ok) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(resp.json());

        case 6:
          todos = _context.sent;
          return _context.abrupt("return", {
            todos: todos
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getTodosAsync = getTodosAsync;
var addTodoAsync = (0, _toolkit.createAsyncThunk)('todo/addTodoAsync', function _callee2(payload) {
  var resp, todo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              title: payload.title
            })
          }));

        case 2:
          resp = _context2.sent;

          if (!resp.ok) {
            _context2.next = 8;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(resp.json());

        case 6:
          todo = _context2.sent;
          return _context2.abrupt("return", {
            todo: todo
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.addTodoAsync = addTodoAsync;
var toggleCompleteAsync = (0, _toolkit.createAsyncThunk)('todo/completeTodoAsync', function _callee3(payload) {
  var resp, todo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("http://localhost:3001/todos/".concat(payload.id), {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              completed: payload.completed
            })
          }));

        case 2:
          resp = _context3.sent;

          if (!resp.ok) {
            _context3.next = 8;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(resp.json());

        case 6:
          todo = _context3.sent;
          return _context3.abrupt("return", {
            todo: todo
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.toggleCompleteAsync = toggleCompleteAsync;
var deleteTodoAsync = (0, _toolkit.createAsyncThunk)('todo/deleteTodoAsync', function _callee4(payload) {
  var resp;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("http://localhost:3001/todos/".concat(payload.id), {
            credentials: 'include',
            method: 'DELETE'
          }));

        case 2:
          resp = _context4.sent;

          if (!resp.ok) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", {
            id: payload.id
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.deleteTodoAsync = deleteTodoAsync;
var todoSlice = (0, _toolkit.createSlice)({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: function addTodo(state, action) {
      var todo = {
        id: (0, _nanoid.nanoid)(),
        title: action.payload.title,
        completed: false
      };
      state.push(todo);
    },
    toggleComplete: function toggleComplete(state, action) {
      var index = state.findIndex(function (todo) {
        return todo.id === action.payload.id;
      });
      state[index].completed = action.payload.completed;
    },
    deleteTodo: function deleteTodo(state, action) {
      return state.filter(function (todo) {
        return todo.id !== action.payload.id;
      });
    }
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, getTodosAsync.fulfilled, function (state, action) {
    return action.payload.todos;
  }), _defineProperty(_extraReducers, addTodoAsync.fulfilled, function (state, action) {
    state.push(action.payload.todo);
  }), _defineProperty(_extraReducers, toggleCompleteAsync.fulfilled, function (state, action) {
    var index = state.findIndex(function (todo) {
      return todo.id === action.payload.todo.id;
    });
    state[index].completed = action.payload.todo.completed;
  }), _defineProperty(_extraReducers, deleteTodoAsync.fulfilled, function (state, action) {
    return state.filter(function (todo) {
      return todo.id !== action.payload.id;
    });
  }), _extraReducers)
});
exports.todoSlice = todoSlice;
var _todoSlice$actions = todoSlice.actions,
    addTodo = _todoSlice$actions.addTodo,
    toggleComplete = _todoSlice$actions.toggleComplete,
    deleteTodo = _todoSlice$actions.deleteTodo;
exports.deleteTodo = deleteTodo;
exports.toggleComplete = toggleComplete;
exports.addTodo = addTodo;
var _default = todoSlice.reducer;
exports["default"] = _default;