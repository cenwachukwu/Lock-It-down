// authetication is controlling if an incoming request can proceed or not
// authorization is controlling if an authenticated request has the correct permissions to access a resource
// jwt authentications are basically tokens passed to check auth on the server. so it's a bearer token strategy that allows the api to be statless with user auth
import config from "../config";
import { User } from "../resources/user/user.model";
import jwt from "jsonwebtoken";

// getting new tokens
// newToken function takes in User from the user.model and creates a new json web token based on the user.id
// signed with the correct secerts and xpiration time
// user goes in, token come out
// creates our payload
export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

// verifying tokens
// verifyToken function does the opposite of newToken. So given a token, it will verify that the token was created with the same secret from the same server
// an it will return a payload and in this case it would be a user
// token goes in user comes out
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

// signup
// here we are implementing the signup logic using a controller:
// accepts an email and password
export const signup = async (req, res) => {
  // if no email and password we want to return a 400 error and say "needs email and password"
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "needs email and password" });
  }
  // try/catch because:
  // if we have the email and password we want to try to create a new user and token and returns the token with .send()
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
    // we also want to be able to catch any errors and end the req without sending a message with .end()
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

// signin
// signin logic using controllers:
// users must be real and not invalid and passwords must match
export const signin = async (req, res) => {
  // if no email and password we want to return a 400 error and say "needs email and password"
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }
  // catch any invalid emails and password combo i.e. not user

  // try/catch
  // if we have the email and password we want to try to find the user and token and returns the token with .send()
  try {
    // if wrong email and password (not user) we return a 401 status and send a message using the invalid label we created
    // check if the password is the same as the one in the db using the checkPassword() in the user.model
    // if wrong password (not user) we return a 401 status and send a message using the invalid label we created
    // return the user token
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

// protect middleware
