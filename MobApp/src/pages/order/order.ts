import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Meals, PromiseResp } from "../../providers/meals";
import { Orders } from "../../providers/orders";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})
export class orderPage {
    isOrdered: boolean;
    typeChosen: boolean;
    Orders: any;
    OrderMeals: Array<any>;
    Meals: Array<any>;
    total: number;
    type: string;
    deliveryTime: any;
    onTheWayTime: any;
    table: string;
    userId: any;
    restId: string;
    constructor(private navParams: NavParams, public meals: Meals, public orders: Orders,
        public alertCtrl: AlertController, public toastCtrl: ToastController) {
        this.typeChosen = true;
        this.isOrdered = false;
        this.type = "";
        this.table = "";
        this.OrderMeals = new Array<any>();
        this.Meals = new Array<any>();
        this.total = 0;
        this.restId = navParams.get('restId');
        this.deliveryTime = new Date(new Date().getTime() + 3 * 3600000).toISOString();
        this.onTheWayTime = new Date(new Date().getTime() + 3 * 3600000).toISOString();
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
    ChangeType() { if (this.type != "") this.typeChosen = false; }
    Order(data) {
        let st: string;
        if (this.type == "Delivery") st = "Masr Station";
        else if (this.type == "OntheWay") st = "Masr Station";
        else st = data.value.table;
        let Order = {
            owner: this.userId, restaurant: this.restId, type: this.type, meals: this.Meals, address: {
                street: st,
                city: "Alexandria1",
                country: "Egypt"
            }
        }
        this.orders.createOrder(Order).then((resp: PromiseResp) => {
            this.isOrdered = true;
            let alert = this.alertCtrl.create({
                title: 'Order Success!',
                subTitle: 'Share with your friends and family! Your Order Number is ' + resp.response.OrderNum,
                buttons: ['OK']
            });
            alert.present();
        }).catch(err => Utilities.showToast("Request Failed."));
    }
}