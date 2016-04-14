import * as express from "express";
import * as bodyParser from "body-parser";
import {Router} from "express-serve-static-core";

import {readQuery} from "../request-helpers";
import * as accounts from "../services/accounts";

export let accountsRouter: Router = express.Router();

accountsRouter.route("/accounts")
  .get((req, res) => {
    res.status(200).json({page: 0, data: []});
  })
  .post(
    bodyParser.json(),
    (req, res) => {
      console.log(req.body);
      return readQuery(req.body, accounts.registerArgumentsSchema)
        .then((sanitizedQuery: accounts.RegisterArguments) => {
          return accounts.register(sanitizedQuery);
        })
        .then(account => account.exportData([["_id"], ["login"]], "json"))
        .then((jsonData) => {
          res
            .status(200)
            .json(jsonData);
        })
        .catch((error: Error) => {
          console.error(error.name);
          console.error(error.toString());
          console.error(error.stack);
          res
            .status(500)
            .json({message: "Server error"});
        });
    }
  );

accountsRouter.route("/accounts/:id")
  .get((req, res) => {
    res.status(200).json({_id: req.param("id")});
  });

export default accountsRouter;
