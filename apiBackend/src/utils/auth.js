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
// signup
// signin
// protect middleware
