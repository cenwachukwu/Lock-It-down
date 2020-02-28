// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js

import { Router } from "express";
import { controllers } from "./notes.controllers";

// we would also import our controllers too

// route is a path and an HTTP method

const router = Router();

// /api/notes
router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createOne);

// /api/notes/:id
router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
