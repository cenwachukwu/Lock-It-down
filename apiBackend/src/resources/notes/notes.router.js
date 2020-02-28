// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js

import { Router } from "express";

// we would also import our controllers too

// route is a path and an HTTP method

const router = Router();

// /api/notes
router
  .route("/")
  .get()
  .post();

// /api/notes/:id
router
  .route("/:id")
  .get()
  .put()
  .delete();

export default router;
