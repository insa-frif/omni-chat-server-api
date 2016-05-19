"use strict";
var mongodb = require("mongodb");
var via_proxy_mongo_1 = require("via-proxy-mongo");
var MONGO_URL = "mongodb://localhost:27017/omni-chat";
var COLLECTION_NAME = "accounts";
exports.accountProxy = new via_proxy_mongo_1.MongoProxy(mongodb.MongoClient.connect(MONGO_URL), COLLECTION_NAME);
