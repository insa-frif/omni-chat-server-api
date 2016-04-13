import * as express from "express";
import {Router} from "express-serve-static-core";

export let usersRouter: Router = express.Router();

usersRouter.route("/users")
  .get((req, res) => {
    res.status(200).json({page: 0, data: []});
  });

usersRouter.route("/users/:id")
  .get((req, res) => {
    res.status(200).json({_id: req.param("id")});
  });

export default usersRouter;
