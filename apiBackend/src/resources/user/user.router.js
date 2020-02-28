// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js

import { Router } from "express";
import { person, updatePerson, deletePerson } from "./user.controllers";

// we would also import our controllers too

// route is a path and an HTTP method

const router = Router();

// we will get one autheticated user per time
router.get("/", person);

// we also want update our autheticated user by our autheticated user
router.put("/:id", updatePerson);

//Users can now delete themselves
router.delete("/:id", deletePerson);

export default router;

// because we are doing authentication, we will post()/create when we authenticate ie. signin/signup
