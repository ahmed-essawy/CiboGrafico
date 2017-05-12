export type Duration = number;
export type Email = string;
export type Id = { _id: string };
export type Name = { name: string };
export type MealPrice = { _id: string, price: Price };

export enum OrderRate { None, VeryBad, Bad, Good, VeryGood, Excellent }

export enum OrderType { Delivery, OnTheWay, Inside }

export type Phone = string;
export type Price = number;
export type Uri = string;

export let objectId = (id) => require("mongodb").ObjectId(id);