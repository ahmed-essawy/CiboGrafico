import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Meals } from "../../providers/meals";
import { Orders } from "../../providers/orders";
import { PromiseResp } from "../../providers/classes";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: 'page-joinOrder',
    templateUrl: 'joinOrder.html'
})
export class joinOrderPage {
    isOrdered: boolean;
    Orders: any;
    OrderMeals: Array<any>;
    Meals: Array<any>;
    total: number;
    OrderNum: number;
    userId: any;
    constructor(private navParams: NavParams, private meals: Meals, private orders: Orders) {
        this.isOrdered = false;
        this.Meals = new Array<any>();
        this.OrderMeals = new Array<any>();
        this.total = 0;
        this.Orders = navParams.get("orders");
        Sql.selectOptions("_id").then(resp => this.userId = resp.response).catch(err => console.log(err));
        for (let key in this.Orders) {
            this.meals.read(key).then((resp: PromiseResp) => {
                this.Meals.push({
                    "_id": resp.response._id, "price": resp.response.price, "quantity": this.Orders[key]
                });
                resp.response.quantity = this.Orders[key];
                this.total += (resp.response.quantity * resp.response.price);
                this.OrderMeals.push(resp.response);
            }).catch(err => console.log(err));
        }
    }
    JoinOrder() {
        let SubOrder = {
            num: Number(this.OrderNum),
            owner: this.userId, meals: this.Meals
        }
        this.orders.joinOrder(SubOrder).then((resp: PromiseResp) => {
            this.isOrdered = true;
            Utilities.showToast("Request is pending.");
        }).catch(err => Utilities.showToast("Request is failed."););
    }
}