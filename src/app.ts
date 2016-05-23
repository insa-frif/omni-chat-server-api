import * as express from "express";
import {Express} from "express-serve-static-core";

import * as cors from "cors";

export let app: Express = express();
app.use(cors());

export default app;
