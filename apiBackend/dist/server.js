"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config"));

var _db = require("./utils/db");

var _user = _interopRequireDefault(require("./resources/user/user.router"));

var _auth = require("./utils/auth");

var _user2 = require("./resources/user/user.controllers");

var _notes = _interopRequireDefault(require("./resources/notes/notes.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.disable("x-powered-by");
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)("dev"));
app.post("/signup", _auth.signup);
app.post("/signin", _auth.signin); // how do we get all of our users:
// the protect middleware was stoping us from accessing all the users without auth
// will take out later because user info will be made public

app.get("/users", _user2.users);
app.use("/api", _auth.protect);
app.use("/api/user", _user.default);
app.use("/api/notes", _notes.default);

async () => {
  try {
    await (0, _db.connect)();
    app.listen(_config.default.port, () => {
      console.log(`REST API on :${_config.default.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};