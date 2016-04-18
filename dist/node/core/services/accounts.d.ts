import * as Bluebird from "bluebird";
import { AccountModel } from "../data/account/account-model";
import { DocumentType } from "via-type";
export interface RegisterArguments {
    login: string;
    password: string;
}
export declare let registerArgumentsSchema: DocumentType;
export declare function register(args: RegisterArguments): Bluebird<AccountModel>;
export declare function getAll(): Bluebird<AccountModel[]>;
