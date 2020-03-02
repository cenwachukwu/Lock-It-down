"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
const config = {
  secrets: {
    jwt: "learneverything"
  },
  dbUrl: "process.env.DB_URL"
};
exports.config = config;