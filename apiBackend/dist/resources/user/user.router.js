"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("./user.controllers");

// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js
// we would also import our controllers too
// route is a path and an HTTP method
const router = (0, _express.Router)(); // we will get one autheticated user per time

router.get("/", _user.person); // we also want update our autheticated user by our autheticated user

router.put("/:id", _user.updatePerson); //Users can now delete themselves

router.delete("/:id", _user.deletePerson);
var _default = router; // because we are doing authentication, we will post()/create when we authenticate ie. signin/signup

exports.default = _default;