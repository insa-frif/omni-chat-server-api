import * as express from "express";
import {Router} from "express-serve-static-core";

export let indexRouter: Router = express.Router();

indexRouter.route("/")
  .all((req, res) => {
    res.status(200).json({version: 1});
  });

export default indexRouter;
