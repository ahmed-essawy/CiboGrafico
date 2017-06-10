import { Component } from "@angular/core";
import { NavParams, NavController, ViewController, AlertController } from "ionic-angular";
import { Meals } from "../../providers/meals";
import { Orders } from "../../providers/orders";
import { PromiseResp } from "../../providers/classes";
import { Sql } from "../../providers/sql";
import { Users } from "../../providers/users";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-joinOrder",
    templateUrl: "joinOrder.html"
})
export class joinOrderPage {
    isOrdered: boolean;
    isLogged: boolean;
    Orders: any;
    OrderMeals: Array<any>;
    Meals: Array<any>;
    total: number;
    OrderNum: number;
    userId: any;
    restId: string;
    constructor(private navParams: NavParams, private meals: Meals, private orders: Orders, private navctrl: NavController, private viewCtrl: ViewController, private alertCtrl: AlertController) {
        this.isOrdered = false;
        this.Meals = new Array<any>();
        this.OrderMeals = new Array<any>();
        this.total = 0;
        this.Orders = navParams.get("orders");
        this.restId = navParams.get('restId');
        Sql.selectOptions("_id").then(resp => this.userId = resp.response).catch(err => console.log(err));
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        console.log(this.isLogged);
        for (let key in this.Orders) {
            this.meals.Read(key).then((resp: PromiseResp) => {
                this.Meals.push({ "_id": resp.response._id, "price": resp.response.discount ? (resp.response.price * (1 - resp.response.discount)) : resp.response.price, "quantity": this.Orders[key] });
                resp.response.quantity = this.Orders[key];
                if (resp.response.discount) this.total += (resp.response.quantity * (resp.response.price * (1 - resp.response.discount)));
                else this.total += (resp.response.quantity * resp.response.price);
                this.OrderMeals.push(resp.response);
            }).catch(err => console.log(err));
        }
    }
    JoinOrder() {
        if (this.isLogged) {
            const SubOrder = {
                num: Number(this.OrderNum),
                owner: this.userId, meals: this.Meals
            };
            this.orders.joinOrder(SubOrder).then((resp: PromiseResp) => {
                this.isOrdered = true;
                Sql.deleteOptions("order-" + this.restId).then(d => {
                    this.navctrl.remove(this.viewCtrl.index - 2);
                }).catch(err => { });
                Utilities.showToast("Request is pending.");
            }).catch(err => Utilities.showToast("Request is failed."));
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Order Denied!',
                subTitle: 'You should log in first to Order!',
                buttons: ['OK']
            });
            alert.present();
        }
    }
}