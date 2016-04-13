import * as Promise from "bluebird";
import { Type, CollectionType, CollectionTypeAsync } from "via-core";
import { UpdateQuery } from "~via-core/dist/node/core/interfaces/type";
export interface ArrayOptions {
    maxLength: number;
}
export declare class ArrayType implements CollectionTypeAsync<any[], any> {
    isSync: boolean;
    name: string;
    options: ArrayOptions;
    itemType: Type<any, any>;
    constructor(itemType: Type<any, any>, options: ArrayOptions);
    readSync(format: string, val: any): any[];
    read(format: string, val: any): Promise<any[]>;
    writeSync(format: string, val: any[]): any;
    write(format: string, val: any[]): Promise<any>;
    testSync(val: any[]): Error;
    test(val: any[]): Promise<Error>;
    normalizeSync(val: any): any;
    normalize(val: any): Promise<any>;
    equalsSync(val1: any, val2: any): boolean;
    equals(val1: any, val2: any): Promise<boolean>;
    cloneSync(val: any): any;
    clone(val: any): Promise<any>;
    diffSync(oldVal: any, newVal: any): any;
    diff(oldVal: any, newVal: any): Promise<any>;
    patchSync(oldVal: any, diff: any): any;
    patch(oldVal: any, diff: any): Promise<any>;
    revertSync(newVal: any, diff: any): any;
    revert(newVal: any, diff: any): Promise<any>;
    reflect(visitor: (value?: any, key?: string, parent?: CollectionType<any, any>) => any): Promise<void>;
    diffToUpdate(newVal: any, diff: any, format: string): Promise<UpdateQuery>;
}
