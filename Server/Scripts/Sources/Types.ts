export enum AccountType { Administrator, User, Branch }
export type Duration = number;
export type Email = string;
export type Id = { _id: string };
export type MealPrice = { _id: string, price: Price };
export type Order_Rate = { _id: string, rate: string };
export enum Rate { None, VeryBad, Bad, Good, VeryGood, Excellent }
export enum OrderType { Delivery, OnTheWay, Inside }
export enum JoinState { Accepted, Pending, Rejected }
export type Phone = string;
export type Price = number;
export type Uri = string;
export type Username = string;
export let objectId = (id: any) => {
    if (id) return require("mongodb").ObjectId(id);
    console.log("Given ObjectId can't be undefined");
    return false;
};
declare global {
    interface Array<T> {
        pushIfNotExist(element: T): Array<T>;
    }
    interface String {
        isEmail(element: string): Boolean;
    }
}
if (!Array.prototype.pushIfNotExist) {
    Array.prototype.pushIfNotExist = <T>(element: T): T => {
        if (this.indexOf(element) === -1) return this.push(element);
        return element;
    };
}
if (!String.prototype.isEmail) {
    String.prototype.isEmail = <T>(email: string): Boolean =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};