"use strict";
var account_model_1 = require("../data/account/account-model");
var account_proxy_mongo_1 = require("../data/account/account-proxy-mongo");
var via_type_1 = require("via-type");
exports.registerArgumentsSchema = new via_type_1.DocumentType({
    properties: {
        login: { type: new via_type_1.StringType() },
        password: { type: new via_type_1.StringType() }
    }
});
function register(args) {
    return account_model_1.AccountModel
        .getNew()
        .then(function (model) {
        return model.set({
            login: args.login,
            password: args.password // TODO: hash, etc.
        });
    })
        .then(function (model) {
        return model.create({ proxy: account_proxy_mongo_1.accountProxy });
    });
}
exports.register = register;
