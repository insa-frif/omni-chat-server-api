import * as express from "express";
import {Express} from "express-serve-static-core";

import * as cors from "cors";
import {router} from "./router";

export let app: Express = express();
app.use(cors());
app.use(router);

export default app;
