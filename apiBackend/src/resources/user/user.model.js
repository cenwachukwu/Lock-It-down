// data modelling: it's a way to think about the structure of our data and the relationships between different objects in our application and how we'll store that data and embody those relationships in our database.

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    settings: {
      theme: {
        type: String,
        required: true,
        default: "dark"
      },
      notifications: {
        type: Boolean,
        required: true,
        default: true
      },
      compactMode: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  },
  { timestamps: true }
);

// hash password with bcrypt
userSchema.pre("save", function(next) {});

// compare password with bcrypt
userSchema.methods.checkPassword = function(password) {};

export const User = mongoose.model("user", userSchema);
