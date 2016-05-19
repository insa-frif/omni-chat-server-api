"use strict";
var Bluebird = require("bluebird");
var account_model_1 = require("../data/account/account-model");
var account_proxy_mongo_1 = require("../data/account/account-proxy-mongo");
var via_type_1 = require("via-type");
exports.registerArgumentsSchema = new via_type_1.DocumentType({
    properties: {
        login: { type: new via_type_1.StringType({ lowerCase: true, trimmed: true, minLength: 3, maxLength: 32 }) },
        password: { type: new via_type_1.StringType({ trimmed: true, minLength: 5, maxLength: 256 }) }
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
        .tap(console.log)
        .then(function (model) {
        return model.create({ proxy: account_proxy_mongo_1.accountProxy });
    });
}
exports.register = register;
function getAll() {
    return Bluebird.resolve(account_model_1.AccountModel.find({}, { proxy: account_proxy_mongo_1.accountProxy }));
}
exports.getAll = getAll;
