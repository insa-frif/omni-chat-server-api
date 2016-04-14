import { Model, FindOptions } from "via-model";
import * as Bluebird from "bluebird";
export declare class AccountModel extends Model {
    constructor();
    getDefaultData(options?: any): Bluebird<any>;
    static getNewSync(opt?: any): AccountModel;
    static getNew(opt?: any): Bluebird<AccountModel>;
    static getByIdSync(id: string, opt?: any): AccountModel;
    static getById(id: string, opt?: any): Bluebird<AccountModel>;
    static find(filter: Object, opt?: FindOptions): Bluebird<AccountModel[]>;
}
