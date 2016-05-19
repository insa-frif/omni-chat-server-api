"use strict";
var express = require("express");
exports.indexRouter = express.Router();
exports.indexRouter.route("/")
    .all(function (req, res) {
    res.status(200).json({ version: 1 });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.indexRouter;
