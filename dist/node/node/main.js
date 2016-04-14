"use strict";
var http = require("http");
var app_1 = require("../core/app");
var app_2 = require("../core/app");
exports.app = app_2.app;
var router_1 = require("../core/router");
exports.router = router_1.router;
var HOST = "localhost";
var PORT = 8080;
if (require.main === module) {
    var server = http.createServer(app_1.app);
    server.listen(PORT, HOST, function () {
        console.log("Server running at http://" + HOST + ":" + PORT + "/");
    });
}
