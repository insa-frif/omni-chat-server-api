import * as socketIO from "socket.io";
import * as palantiri from "palantiri-interfaces";
import * as skypeDriver from "palantiri-driver-skype";
import * as facebookDriver from "palantiri-driver-facebook";
import * as Bluebird from "bluebird";
import {Server as HttpServer} from "http";

export function startProxy (server: HttpServer) {
  let ioServer = socketIO(server);

  ioServer.on("connection", (socket: any) => {
    console.log(`Connection ${socket.id}`);
    bindEvents(socket);
  });
}

interface SocketContext {
  id: string;
  driverName: string;
  connection: palantiri.Connection;
  api: palantiri.Api;
}

let contexts: {[id: string]: SocketContext} = {};
function getContext(id: string) {
  if (!(id in contexts)) {
    contexts[id] = {
      id: id,
      driverName: null,
      connection: null,
      api: null
    }
  }
  return contexts[id];
}


function getApi(socket: any): Bluebird<palantiri.Api> {
  let api = getContext(socket.id).api;
  if (api === null) {
    return Bluebird.reject(new Error("Api is not available"));
  } else{
    return Bluebird.resolve(api);
  }
}

function bindEvents (socket: any) {
  socket.on("request", (data: any) => {
    handleRequest(socket, data);
  });
}

function handleRequest (socket: any, request: any) {
  let requestType = request.type;
  let requestId = request.id;
  let data = request.data;
  let context = getContext(socket.id);
  console.log(`Received request ${requestId}@${socket.id}`);
  console.log(requestType);
  console.log(data);

  let responsePromise: Bluebird<any>;
  switch(requestType) {
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
      responsePromise = Bluebird.reject(new Error(`Unknown request type ${requestType}`));
  }

  responsePromise
    .then((response: any) => {
      return JSON.parse(JSON.stringify(response)); // Ensure that there are no cycles
    })
    .then(
      (response: any) => {
        console.log(`Responding to request ${requestId}@${socket.id}`);
        console.log(response);
        socket.emit("request-response", {
          id: requestId,
          error: null,
          data: response
        })
      },
      (error: Error) => {
        console.log(`An error happened while handling request ${requestId}@${socket.id}`);
        console.log(error.message);
        console.error(error.stack);
        socket.emit("request-response", {
          id: requestId,
          error: error.message,
          data: null
        });
      }
    )
}

function handleStartProxyRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return Bluebird.try(() => {
    if (context.driverName !== null) {
      throw new Error("Proxy already started");
    }
    let driverName = data.driverName;
    let options = data.options;
    let connection: palantiri.Connection = null;

    switch(driverName) {
      case "facebook":
        connection = new facebookDriver.Connection(options);
        break;
      case "skype":
        connection = new skypeDriver.Connection(options);
        break;
      default:
        throw new Error(`Unknown driver ${driverName}`);
    }

    context.driverName = driverName;
    context.connection = connection;

    return Bluebird.resolve(connection.connect())
      .then((api: palantiri.Api) => {
        context.api = api;
        return null;
      });
  });
}

function handleGetContactsRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.getContacts();
    });
}

function handleGetCurrentUserRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.getCurrentUser();
    });
}

function handleGetDiscussionsRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.getDiscussions({});
    });
}

