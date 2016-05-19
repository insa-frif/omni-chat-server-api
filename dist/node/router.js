"use strict";
var express = require("express");
var index_1 = require("./routes/index");
var accounts_1 = require("./routes/accounts");
exports.router = express.Router();
exports.router.use(index_1.indexRouter);
exports.router.use(accounts_1.accountsRouter);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.router;
