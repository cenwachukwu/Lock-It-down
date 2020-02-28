"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.removeOne = exports.updateOne = exports.createOne = exports.getMany = exports.getOne = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// read one note by authenticated user
const getOne = model => async (req, res) => {
  try {
    const doc = await model.findOne({
      createdBy: req.user._id,
      _id: req.params.id
    }).lean().exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // geting all notes by authenticated user


exports.getOne = getOne;

const getMany = model => async (req, res) => {
  try {
    const docs = await model.find({
      createdBy: req.user._id
    }).lean().exec();
    res.status(200).json({
      data: docs
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // allowing authenticated user to create notes


exports.getMany = getMany;

const createOne = model => async (req, res) => {
  const createdBy = req.user._id;

  try {
    const doc = await model.create(_objectSpread({}, req.body, {
      createdBy
    }));
    res.status(201).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // allowing authenticated user to update notes


exports.createOne = createOne;

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model // we use findOneAndUpdate b/c we have two params we are finding by
    .findOneAndUpdate({
      createdBy: req.user._id,
      _id: req.params.id
    }, req.body, {
      new: true
    }).lean().exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({
      data: updatedDoc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // allowing authenticated user to remove notes


exports.updateOne = updateOne;

const removeOne = model => async (req, res) => {
  try {
    await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id
    });
    return res.status(200).json({
      data: "Your note has been deleted"
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // now we'll export all of them


exports.removeOne = removeOne;

const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});

exports.crudControllers = crudControllers;