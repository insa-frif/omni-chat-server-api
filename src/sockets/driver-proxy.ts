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
    case "add-members-to-discussion":
      responsePromise = handleAddMembersToDiscussionRequest(socket, context, data);
      break;
    case "create-discussion":
      responsePromise = handleCreateDiscussionRequest(socket, context, data);
      break;
    case "get-account":
      responsePromise = handleGetAccountRequest(socket, context, data);
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
    case "get-messages-from-discussion":
      responsePromise = handleGetMessagesFromDiscussionRequest(socket, context, data);
      break;
    case "leave-discussion":
      responsePromise = handleLeaveDiscussionRequest(socket, context, data);
      break;
    case "remove-members-from-discussion":
      responsePromise = handleRemoveMembersFromDiscussionRequest(socket, context, data);
      break;
    case "send-message":
      responsePromise = handleSendMessageRequest(socket, context, data);
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


function handleAddMembersToDiscussionRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.addMembersToDiscussion(data.members, data.discussion);
    })
    .thenReturn(null);
}

function handleCreateDiscussionRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.createDiscussion(data.members, data.options);
    });
}

function handleGetAccountRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.getAccount(data.account);
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

function handleGetMessagesFromDiscussionRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.getMessagesFromDiscussion(data.discussion, data.options);
    });
}

function handleLeaveDiscussionRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.leaveDiscussion(data.discussion);
    })
    .thenReturn(null);
}

function handleRemoveMembersFromDiscussionRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.removeMembersFromDiscussion(data.members, data.discussion);
    })
    .thenReturn(null);
}

function handleSendMessageRequest (socket: any, context: SocketContext, data: any): Bluebird<any> {
  return getApi(socket)
    .then((api: palantiri.Api) => {
      return api.sendMessage(data.message, data.discussion);
    });
}
