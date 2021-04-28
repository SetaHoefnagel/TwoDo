"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _todoSlice = _interopRequireDefault(require("./todoSlice"));

var _todoListSlice = _interopRequireDefault(require("./todoListSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _toolkit.configureStore)({
  reducer: {
    todos: _todoSlice["default"],
    todoLists: _todoListSlice["default"]
  }
});

exports["default"] = _default;