import * as mongodb from "mongodb";
import {accountSchema} from "./account-schema";
import {MongoProxy} from "via-proxy-mongo";

const MONGO_URL = "mongodb://localhost:27017/omni-chat";
const COLLECTION_NAME: string = "accounts";

export let accountProxy: MongoProxy = new MongoProxy(mongodb.MongoClient.connect(MONGO_URL), COLLECTION_NAME);
