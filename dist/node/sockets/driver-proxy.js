"use strict";
var socketIO = require("socket.io");
var skypeDriver = require("palantiri-driver-skype");
var facebookDriver = require("palantiri-driver-facebook");
var Bluebird = require("bluebird");
function startProxy(server) {
    var ioServer = socketIO(server);
    ioServer.on("connection", function (socket) {
        console.log("Connection " + socket.id);
        bindEvents(socket);
    });
}
exports.startProxy = startProxy;
var contexts = {};
function getContext(id) {
    if (!(id in contexts)) {
        contexts[id] = {
            id: id,
            driverName: null,
            connection: null,
            api: null
        };
    }
    return contexts[id];
}
function getApi(socket) {
    var api = getContext(socket.id).api;
    if (api === null) {
        return Bluebird.reject(new Error("Api is not available"));
    }
    else {
        return Bluebird.resolve(api);
    }
}
function bindEvents(socket) {
    socket.on("request", function (data) {
        handleRequest(socket, data);
    });
}
function handleRequest(socket, request) {
    var requestType = request.type;
    var requestId = request.id;
    var data = request.data;
    var context = getContext(socket.id);
    console.log("Received request " + requestId + "@" + socket.id);
    console.log(requestType);
    console.log(data);
    var responsePromise;
    switch (requestType) {
        case "start-proxy":
            responsePromise = handleStartProxyRequest(socket, context, data);
            break;
        case "get-contacts":
            responsePromise = handleGetContactsRequest(socket, context, data);
            break;
        case "get-current-user":
            responsePromise = handleGetCurrentUserRequest(socket, context, data);
            break;
        case "get-discussions":
            responsePromise = handleGetDiscussionsRequest(socket, context, data);
            break;
        default:
            console.log("unknown-type");
            responsePromise = Bluebird.reject(new Error("Unknown request type " + requestType));
    }
    responsePromise
        .then(function (response) {
        return JSON.parse(JSON.stringify(response)); // Ensure that there are no cycles
    })
        .then(function (response) {
        console.log("Responding to request " + requestId + "@" + socket.id);
        console.log(response);
        socket.emit("request-response", {
            id: requestId,
            error: null,
            data: response
        });
    }, function (error) {
        console.log("An error happened while handling request " + requestId + "@" + socket.id);
        console.log(error.message);
        console.error(error.stack);
        socket.emit("request-response", {
            id: requestId,
            error: error.message,
            data: null
        });
    });
}
function handleStartProxyRequest(socket, context, data) {
    return Bluebird.try(function () {
        if (context.driverName !== null) {
            throw new Error("Proxy already started");
        }
        var driverName = data.driverName;
        var options = data.options;
        var connection = null;
        switch (driverName) {
            case "facebook":
                connection = new facebookDriver.Connection(options);
                break;
            case "skype":
                connection = new skypeDriver.Connection(options);
                break;
            default:
                throw new Error("Unknown driver " + driverName);
        }
        context.driverName = driverName;
        context.connection = connection;
        return Bluebird.resolve(connection.connect())
            .then(function (api) {
            context.api = api;
            return null;
        });
    });
}
function handleGetContactsRequest(socket, context, data) {
    return getApi(socket)
        .then(function (api) {
        return api.getContacts();
    });
}
function handleGetCurrentUserRequest(socket, context, data) {
    return getApi(socket)
        .then(function (api) {
        return api.getCurrentUser();
    });
}
function handleGetDiscussionsRequest(socket, context, data) {
    return getApi(socket)
        .then(function (api) {
        return api.getDiscussions({});
    });
}
