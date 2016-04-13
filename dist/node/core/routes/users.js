"use strict";
var express = require("express");
exports.usersRouter = express.Router();
exports.usersRouter.route("/users")
    .get(function (req, res) {
    res.status(200).json({ page: 0, data: [] });
});
exports.usersRouter.route("/users/:id")
    .get(function (req, res) {
    res.status(200).json({ _id: req.param("id") });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.usersRouter;
