import * as Bluebird from "bluebird";
import {schema, utils} from "via-core";

export function readQuery(untrustedJsonData: utils.Document, querySchema: schema.Schema): Bluebird<any> {
  return Bluebird.try(() => {
    return querySchema
      .read("json", untrustedJsonData)
      .then((data: any) => {
        return querySchema
          .test(data)
          .then((error: Error) => {
            if (error !== null) {
              return Bluebird.reject(error);
            }
            return data;
          });
      });
  });
}
