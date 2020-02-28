// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js

import { Router } from "express";

// route is a path and an HTTP method

const router = Router();

// we will get one autheticated user per time
router.get("/");

// how do we get all of our users

// we also want update our autheticated user by our autheticated user
router.put("/");

export default router;

// because we are doing authentication, we will post()/create when we authenticate ie. signin/signup
