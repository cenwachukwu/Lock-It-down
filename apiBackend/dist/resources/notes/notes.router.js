"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js
// we would also import our controllers too
// route is a path and an HTTP method
const router = (0, _express.Router)(); // /api/notes

router.route("/").get().post(); // /api/notes/:id

router.route("/:id").get().put().delete();
var _default = router;
exports.default = _default;