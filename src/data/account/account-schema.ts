import {StringType} from "via-type";
import {Schema, viaModelSchema} from "via-schema";

export let accountSchema = viaModelSchema.extend({properties: {
  login: {type: new StringType()},
  password: {type: new StringType()}
}});
