export enum AccountType { Administrator, User, Branch }

export type Duration = number;
export type Email = string;
export type Id = { _id: string };
export type MealPrice = { _id: string, price: Price };
export type Order_Rate = { _id: string, rate: string };

export enum OrderRate { None, VeryBad, Bad, Good, VeryGood, Excellent }

export enum OrderType { Delivery, OnTheWay, Inside }

export type Phone = string;
export type Price = number;
export type Uri = string;
export type Username = string;
export let objectId = (id: any) => require("mongodb").ObjectId(id);
export let isEmail = (email: Email): boolean => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);