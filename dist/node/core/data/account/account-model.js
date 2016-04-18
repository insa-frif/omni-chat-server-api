"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var via_model_1 = require("via-model");
var account_schema_1 = require("./account-schema");
var AccountModel = (function (_super) {
    __extends(AccountModel, _super);
    function AccountModel() {
        _super.call(this);
        this._name = "user";
        this._schema = account_schema_1.accountSchema;
    }
    AccountModel.prototype.getDefaultData = function (options) {
        return _super.prototype
            .getDefaultData.call(this)
            .then(function (data) {
            return data;
        });
    };
    AccountModel.getNewSync = function (opt) { return null; };
    AccountModel.getNew = function (opt) { return null; };
    AccountModel.getByIdSync = function (id, opt) { return null; };
    AccountModel.getById = function (id, opt) { return null; };
    AccountModel.find = function (filter, opt) { return null; };
    AccountModel = __decorate([
        via_model_1.generateAccessors, 
        __metadata('design:paramtypes', [])
    ], AccountModel);
    return AccountModel;
}(via_model_1.Model));
exports.AccountModel = AccountModel;
