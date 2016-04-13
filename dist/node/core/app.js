"use strict";
var express = require("express");
var cors = require("cors");
var router_1 = require("./router");
exports.app = express();
exports.app.use(cors());
exports.app.use(router_1.router);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.app;
