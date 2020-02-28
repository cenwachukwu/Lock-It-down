"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePerson = exports.updatePerson = exports.person = exports.users = void 0;

var _user = require("./user.model");

// controllers are just middleware but with the intent of returning data
// so they handle what a route + verb combo can access from the db
// controllers implements the logic that interacts with our database models
// instead of writing a controller for everysingle crud function, we can have generalized controlers
// trying out code for getting all the users
const users = async (req, res) => {
  try {
    const allUsers = await _user.User.find().lean().exec();
    res.status(200).json({
      data: allUsers
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // get one authenticated user by an authenticated user


exports.users = users;

const person = async (req, res) => {
  res.status(200).json({
    data: req.user
  });
}; // updating an autheticated user by an autheticated user


exports.person = person;

const updatePerson = async (req, res) => {
  try {
    const user = await _user.User.findByIdAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true
    }).lean().exec();
    res.status(200).json({
      data: user
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

exports.updatePerson = updatePerson;

const deletePerson = async (req, res) => {
  try {
    await _user.User.findByIdAndDelete({
      _id: req.params.id
    });
    return res.status(200).json({
      data: "Your User profile has been deleted"
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

exports.deletePerson = deletePerson;