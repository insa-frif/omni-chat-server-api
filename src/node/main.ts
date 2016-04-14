import * as http from "http";
import {app} from "../core/app";

export {app} from "../core/app";
export {router} from "../core/router";

const HOST = "localhost";
const PORT = 8080;

if (require.main === module) {
  let server = http.createServer(app);

  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
}

import {AccountModel} from "../core/data/account/account-model";

console.log(AccountModel);
