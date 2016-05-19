import * as express from "express";
import {Router} from "express-serve-static-core";

import {indexRouter} from "./routes/index";
import {accountsRouter} from "./routes/accounts";

export let router: Router = express.Router();

router.use(indexRouter);
router.use(accountsRouter);

export default router;
