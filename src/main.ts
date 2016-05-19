import * as http from "http";
import {app} from "./app";

export {app} from "./app";
export {router} from "./router";

const HOST = "localhost";
const PORT = 8080;

if (require.main === module) {
  let server = http.createServer(app);

  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
}
