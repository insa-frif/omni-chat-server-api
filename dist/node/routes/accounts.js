"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var request_helpers_1 = require("../request-helpers");
var accounts = require("../services/accounts");
exports.accountsRouter = express.Router();
exports.accountsRouter.route("/accounts")
    .get(function (req, res) {
    return accounts.getAll()
        .map(function (account) { return account.exportData(["_id", "login"], "json"); })
        .then(function (jsonData) {
        res.status(200).json({ page: 0, data: jsonData });
    });
})
    .post(bodyParser.json(), function (req, res) {
    // console.log(req.body);
    return request_helpers_1.readQuery(req.body, accounts.registerArgumentsSchema)
        .then(function (sanitizedQuery) {
        return accounts.register(sanitizedQuery);
    })
        .tap(console.log)
        .then(function (account) { return account.exportData(["_id", "login"], "json"); })
        .then(function (jsonData) {
        res
            .status(200)
            .json(jsonData);
    })
        .catch(function (error) {
        // console.error(error.name);
        // console.error(error.toString());
        console.error(error.stack);
        res
            .status(500)
            .json({ error: error.toString() });
    });
});
exports.accountsRouter.route("/accounts/:id")
    .get(function (req, res) {
    res.status(200).json({ _id: req.param("id") });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.accountsRouter;
