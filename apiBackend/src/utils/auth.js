// authetication is controlling if an incoming request can proceed or not
// authorization is controlling if an authenticated request has the correct permissions to access a resource
// jwt authentications are basically tokens passed to check auth on the server. so it's a bearer token strategy that allows the api to be statless with user auth
import config from "../config";
import jwt from "jsonwebtoken";

// getting new tokens
// verifying tokens
// signup
// signin
// protect middleware