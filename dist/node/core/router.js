"use strict";
var express = require("express");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
exports.router = express.Router();
exports.router.use(index_1.indexRouter);
exports.router.use(users_1.usersRouter);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.router;
