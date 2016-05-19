import * as passport from "passport";
import {Handler} from "express";

export let authenticateLocal: Handler = passport.authenticate("local");
