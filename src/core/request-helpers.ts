import * as Bluebird from "bluebird";
import {DocumentType} from "via-type";

export function readQuery(untrustedJsonData: any, querySchema: DocumentType): Bluebird<any> {
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
          })
          .thenReturn(data);
      });
  });
}
