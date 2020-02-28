// controllers are just middleware but with the intent of returning data

// so they handle what a route + verb combo can access from the db

// controllers implements the logic that interacts with our database models

// instead of writing a controller for everysingle crud function, we can have generalized controlers

import { User } from "./user.model";

// trying out code for getting all the users
export const users = async (req, res) => {
  try {
    const allUsers = await User.find()
      .lean()
      .exec();
    res.status(200).json({ data: allUsers });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// get one authenticated user by an authenticated user
export const person = async (req, res) => {
  res.status(200).json({ data: req.user });
};

// updating an autheticated user by an autheticated user
export const updatePerson = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
