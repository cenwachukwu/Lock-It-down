"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _user = require("../resources/user/user.model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// authetication is controlling if an incoming request can proceed or not
// authorization is controlling if an authenticated request has the correct permissions to access a resource
// jwt authentications are basically tokens passed to check auth on the server. so it's a bearer token strategy that allows the api to be statless with user auth
// getting new tokens
// newToken function takes in User from the user.model and creates a new json web token based on the user.id
// signed with the correct secerts and xpiration time
// user goes in, token come out
// creates our payload
const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
}; // verifying tokens
// verifyToken function does the opposite of newToken. So given a token, it will verify that the token was created with the same secret from the same server
// an it will return a payload and in this case it would be a user
// token goes in user comes out


exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
}); // signup
// here we are implementing the signup logic using a controller:
// accepts an email and password


exports.verifyToken = verifyToken;

const signup = async (req, res) => {
  // if no email and password we want to return a 400 error and say "needs email and password"
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "needs email and password"
    });
  } // try/catch because:
  // if we have the email and password we want to try to create a new user and token and returns the token with .send()
  // we also want to be able to catch any errors and end the req without sending a message with .end()

}; // signin
// protect middleware


exports.signup = signup;