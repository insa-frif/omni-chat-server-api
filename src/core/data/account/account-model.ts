import {Model, FindOptions, generateAccessors} from "via-model";
import {accountSchema} from "./account-schema";
import * as Bluebird from "bluebird";

@generateAccessors
export class AccountModel extends Model {
  constructor() {
    super();
    this._name = "user";
    this._schema = accountSchema;
  }

  getDefaultData (options?: any): Bluebird<any> {
    return super
      .getDefaultData()
      .then((data: any) => {
        data.login = "LOGIN";
        data.password = "P4SSW0RD";
        return data;
      });
  }

  static getNewSync (opt?: any): AccountModel {return null;}
  static getNew (opt?: any): Bluebird<AccountModel> {return null;}
  static getByIdSync (id: string, opt?: any): AccountModel {return null;}
  static getById (id: string, opt?: any): Bluebird<AccountModel> {return null;}
  static find (filter: Object, opt?: FindOptions): Bluebird<AccountModel[]> {return null;}
}
