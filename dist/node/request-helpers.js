"use strict";
var Bluebird = require("bluebird");
function readQuery(untrustedJsonData, querySchema) {
    return Bluebird.try(function () {
        return querySchema
            .read("json", untrustedJsonData)
            .then(function (data) {
            return querySchema
                .test(data)
                .then(function (error) {
                if (error !== null) {
                    return Bluebird.reject(error);
                }
                return data;
            });
        });
    });
}
exports.readQuery = readQuery;
