import * as http from "http";
import {app} from "./app";
import {startProxy} from "./sockets/driver-proxy";

export {app} from "./app";
export {startProxy} from "./sockets/driver-proxy";

// Run the server if this is the root module
if (require.main === module) {
  const HOST = "localhost";
  const PORT = 8080;

  let server = http.createServer(app);

  startProxy(server);

  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
}
