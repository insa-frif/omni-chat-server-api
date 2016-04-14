"use strict";
var via_type_1 = require("via-type");
var via_schema_1 = require("via-schema");
exports.accountSchema = via_schema_1.baseSchema.extend({ properties: {
        login: { type: new via_type_1.StringType() },
        password: { type: new via_type_1.StringType() }
    } });
