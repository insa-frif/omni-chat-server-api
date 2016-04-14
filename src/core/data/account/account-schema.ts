import {StringType} from "via-type";
import {Schema, baseSchema} from "via-schema";

export let accountSchema: Schema = baseSchema.extend({properties: {
  login: {type: new StringType()},
  password: {type: new StringType()}
}});
