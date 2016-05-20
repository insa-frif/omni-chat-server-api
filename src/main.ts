import * as http from "http";
import {app} from "./app";

export {app} from "./app";
export {router} from "./router";

// Run the server if this is the root module
if (require.main === module) {
  const HOST = "localhost";
  const PORT = 8080;

  let server = http.createServer(app);

  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
}
