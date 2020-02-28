// data modelling: it's a way to think about the structure of our data and the relationships between different objects in our application and how we'll store that data and embody those relationships in our database.
// we will need to set up a relationship with the user

import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    blogBody: {
      type: String,
      required: true,
      trim: true
    },
    dateCreated: {
      type: Date,
      required: true
    }
    // this is how you set up relationships in mongo using mongoose
  },
  { timestamps: true }
);

// relationships
noteSchema.index();

export const Notes = mongoose.model("notes", noteSchema);
