import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Meals, PromiseResp } from "../../providers/meals";
import { Users } from "../../providers/users";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
import { orderPage } from "../order/order";
import { joinOrderPage } from "../joinOrder/joinOrder";
import { Network } from "@ionic-native/network";
import { mealDetailsPage } from "../mealDetails/mealDetails";
@Component({
    selector: 'page-traditionalMenu',
    templateUrl: 'traditionalMenu.html'
})
export class TraditionalMenuPage {
    Meals: Array<any> = [];
    ordersCount: any = {};
    isOnline: boolean;
    restId: string;
    userId: string;
    isFavourite: boolean = false;
    constructor(private navParams: NavParams, meals: Meals, private navctrl: NavController, private alertCtrl: AlertController, network: Network, private modalCtrl: ModalController, private users: Users) {
        this.restId = navParams.get('Id');
        Sql.selectOptions("_id").then(resp => this.userId = resp.response).catch(err => console.log(err));
        meals.ReadMealsPerRest(navParams.get('Id')).then((resp: PromiseResp) => {
            this.Meals = resp.response;
            this.Meals.forEach(meal => {
                Sql.isExistsFavorite(meal._id).then(resp => console.log(resp.response)).catch(err => console.log(err));
                //meal.isFavourite = Sql.isExistsFavorite(meal._id);
                //console.log(meal.isFavourite);
            })
            this.initOrdersCount();
        }).catch(err => console.log(err));
        this.isOnline = network.type !== "none";
        network.onConnect().subscribe(a => this.isOnline = a.type == "online");
        network.onDisconnect().subscribe(a => this.isOnline = a.type == "online");
    }
    favourite(meal: any) {
        let favMeal = { user: this.userId, meal: { _id: meal._id, name: meal.name, image: meal.image, category: meal.category, price: meal.price, ingredients: meal.ingredients, restId: this.restId } };
        this.users.addToFav(favMeal).then((resp: PromiseResp) => Utilities.showToast("Meal added to your favorites.")).catch(err => Utilities.showToast("Failed to add meal."));
    }
    Show(mealId: string) { this.modalCtrl.create(mealDetailsPage, { mealId: mealId }).present(); }
    Add(id: any) {
        Sql.selectOptions("order-" + this.restId).then(object => {
            object.response = JSON.parse(object.response);
            if (object.response[id]) {
                ++object.response[id];
                this.ordersCount[id] = parseInt(object.response[id]);
            } else this.ordersCount[id] = 1;
            Sql.insertOrUpdateOptions({
                key: "order-" + this.restId, value: JSON.stringify(this.ordersCount)
            });
        }).catch(e => {
            this.ordersCount[id] = 1;
            Sql.insertOrUpdateOptions({ key: "order-" + this.restId, value: JSON.stringify(this.ordersCount) });
        });
    }
    Remove(id: any) {
        Sql.selectOptions("order-" + this.restId).then(object => {
            object.response = JSON.parse(object.response);
            if (object.response[id]) {
                if (object.response[id] > 0)--object.response[id];
                this.ordersCount[id] = parseInt(object.response[id]);
                Sql.insertOrUpdateOptions({ key: "order-" + this.restId, value: JSON.stringify(this.ordersCount) });
            } else this.ordersCount[id] = 0;
        }).catch(e => { this.ordersCount[id] = 0; });
    }
    initOrdersCount() {
        this.Meals.forEach(meal => {
            Sql.selectOptions("order-" + this.restId).then(object => {
                object.response = JSON.parse(object.response);
                if (object.response[meal._id]) {
                    if (object.response[meal._id] === "") object.response[meal._id] = "0";
                    this.ordersCount[meal._id] = parseInt(object.response[meal._id]);
                } else this.ordersCount[meal._id] = 0;
            }).catch(e => { this.ordersCount[meal._id] = 0; });
        });
    }
    Reset() {
        Sql.deleteOptions("order-" + this.restId).then(d => {
            for (let key in this.ordersCount) if (this.ordersCount.hasOwnProperty(key)) this.ordersCount[key] = 0;
        }).catch(err => { });
    }
    Order() {
        let orders = {};
        for (let key in this.ordersCount) if (this.ordersCount[key] !== 0) orders[key] = this.ordersCount[key];
        //--------------------------------------------------------------------------
        let alert = this.alertCtrl.create();
        alert.setTitle('Choose Order Type');
        alert.addInput({
            type: 'radio',
            label: 'New Order',
            value: 'NewOrder',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Join Order',
            value: 'JoinOrder',
            checked: false
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                if (data == "NewOrder") this.navctrl.push(orderPage, { orders: orders, restId: this.restId });
                else this.navctrl.push(joinOrderPage, { orders: orders });
            }
        });
        alert.present();
    }
}