"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notes = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// data modelling: it's a way to think about the structure of our data and the relationships between different objects in our application and how we'll store that data and embody those relationships in our database.
// we will need to set up a relationship with the user
const noteSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  noteBody: {
    type: String,
    required: true,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  // this is how you set up relationships in mongo using mongoose
  createdBy: {
    type: _mongoose.default.SchemaTypes.ObjectId,
    // so that mongo knows what model to look for this id
    ref: "user",
    required: true
  }
}, {
  timestamps: true
}); // relationships

noteSchema.index({
  user: 1,
  title: 1
}, {
  unique: true
});

const Notes = _mongoose.default.model("notes", noteSchema);

exports.Notes = Notes;