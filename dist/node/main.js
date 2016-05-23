"use strict";
var http = require("http");
var app_1 = require("./app");
var driver_proxy_1 = require("./sockets/driver-proxy");
var app_2 = require("./app");
exports.app = app_2.app;
var driver_proxy_2 = require("./sockets/driver-proxy");
exports.startProxy = driver_proxy_2.startProxy;
// Run the server if this is the root module
if (require.main === module) {
    var HOST_1 = "localhost";
    var PORT_1 = 8080;
    var server = http.createServer(app_1.app);
    driver_proxy_1.startProxy(server);
    server.listen(PORT_1, HOST_1, function () {
        console.log("Server running at http://" + HOST_1 + ":" + PORT_1 + "/");
    });
}
