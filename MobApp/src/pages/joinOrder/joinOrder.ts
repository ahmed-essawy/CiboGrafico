import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Meals, PromiseResp } from "../../providers/meals";
import { Orders, PromiseResp as PromiseRespOrder } from "../../providers/orders";
/*
  Generated class for the joinOrder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-joinOrder',
    templateUrl: 'joinOrder.html'
})
export class joinOrderPage {
    Orders: any;
    OrderMeals: Array<any>;
    Meals: Array<any>;
    total: number;
    OrderNum: number;
    constructor(public navCtrl: NavController, public navParams: NavParams, public meals: Meals,
        public orders: Orders) {
        this.Meals = new Array<any>();
        this.OrderMeals = new Array<any>();
        this.total = 0;
        this.Orders = navParams.get("orders");
        for (let key in this.Orders) {
            this.meals.read(key).then((resp: PromiseResp) => {
                this.Meals.push(resp.response);
                resp.response.quantity = this.Orders[key];
                this.total += (resp.response.quantity * resp.response.price);
                this.OrderMeals.push(resp.response);
            }).catch(err => console.log(err));
        }
    }
    JoinOrder() {
        let SubOrder = {
            num: Number(this.OrderNum),
            owner: "5922d1aab1772d2744cc251a", meals: this.Meals
        }
        this.orders.joinOrder(SubOrder).then((resp: PromiseRespOrder) => { console.log(resp); })
            .catch(err => console.log(err));
    }
}