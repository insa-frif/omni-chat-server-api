import * as Bluebird from "bluebird";
import { schema, utils } from "via-core";
export declare function readQuery(untrustedJsonData: utils.Document, querySchema: schema.Schema): Bluebird<any>;
