import * as Bluebird from "bluebird";
import {AccountModel} from "../data/account/account-model";
import {accountProxy} from "../data/account/account-proxy-mongo";
import {DocumentType, StringType} from "via-type";

export interface RegisterArguments {
  login: string;
  password: string;
}

export let registerArgumentsSchema = new DocumentType({
  properties: {
    login: {type: new StringType({lowerCase: true, trimmed: true, minLength: 3, maxLength: 32})},
    password: {type: new StringType({trimmed: true, minLength: 5, maxLength: 256})}
  }
});

export function register (args: RegisterArguments): Bluebird<AccountModel> {
  return AccountModel
    .getNew()
    .then((model: AccountModel) => {
      return model.set({
        login: args.login,
        password: args.password // TODO: hash, etc.
      })
    })
    .tap(console.log)
    .then((model: AccountModel) => {
      return model.create({proxy: accountProxy});
    });
}

export function getAll (): Bluebird<AccountModel[]> {
  return Bluebird.resolve(AccountModel.find({}, {proxy: accountProxy}));
}
