"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _notes = require("./notes.model");

// controllers are just middleware but with the intent of returning data
// so they handle what a route + verb combo can access from the db
// controllers implements the logic that interacts with our database models
// instead of writing a controller for everysingle crud function, we can have generalized controlers
// import model
// import generic controllers from utils/crud
var _default = (0, _crud.crudControllers)(_notes.Notes);

exports.default = _default;