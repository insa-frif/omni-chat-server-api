import * as express from "express";
import {Router} from "express-serve-static-core";

import {indexRouter} from "./routes/index";
import {usersRouter} from "./routes/users";

export let router: Router = express.Router();

router.use(indexRouter);
router.use(usersRouter);

export default router;
