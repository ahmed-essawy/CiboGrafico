import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { Sql } from "../../providers/sql";
import { orderPage } from "../order/order";
import { joinOrderPage } from "../joinOrder/joinOrder";
import { Network } from "@ionic-native/network";
@Component({
    selector: 'page-traditionalMenu',
    templateUrl: 'traditionalMenu.html'
})
export class TraditionalMenuPage {
    restaurant: any;
    ordersCount: any = {};
    isOnline: boolean;
    constructor(navParams: NavParams, private rest: Restaurants, private navctrl: NavController,
        private alertCtrl: AlertController, events: Events, network: Network) {
        this.rest.read(navParams.get('Id')).then((resp: PromiseResp) => {
            this.restaurant = resp.response;
            this.initOrdersCount();
        }).catch(err => console.log(err));
        this.isOnline = network.type !== "none";
        network.onConnect().subscribe(a => this.isOnline = a.type == "online");
        network.onDisconnect().subscribe(a => this.isOnline = a.type == "online");
    }
    Show(ingredients: any) {
        let alert = this.alertCtrl.create({
            title: 'Ingredients',
            subTitle: ingredients,
            buttons: ['OK']
        });
        alert.present();
    }
    Add(id: any) {
        Sql.selectOptions("order-" + this.restaurant._id).then(object => {
            object.response = JSON.parse(object.response);
            if (object.response[id]) {
                ++object.response[id];
                this.ordersCount[id] = parseInt(object.response[id]);
            } else this.ordersCount[id] = 1;
            Sql.insertOrUpdateOptions({
                key: "order-" + this.restaurant._id, value: JSON.stringify(this.ordersCount)
            });
        }).catch(e => {
            this.ordersCount[id] = 1;
            Sql.insertOrUpdateOptions({ key: "order-" + this.restaurant._id, value: JSON.stringify(this.ordersCount) });
        });
    }
    Remove(id: any) {
        Sql.selectOptions("order-" + this.restaurant._id).then(object => {
            object.response = JSON.parse(object.response);
            if (object.response[id]) {
                if (object.response[id] > 0)--object.response[id];
                this.ordersCount[id] = parseInt(object.response[id]);
                Sql.insertOrUpdateOptions({
                    key: "order-" + this.restaurant._id, value: JSON.stringify(this.ordersCount)
                });
            } else this.ordersCount[id] = 0;
        }).catch(e => { this.ordersCount[id] = 0; });
    }
    initOrdersCount() {
        this.restaurant.meals.forEach(meal => {
            Sql.selectOptions("order-" + this.restaurant._id).then(object => {
                object.response = JSON.parse(object.response);
                if (object.response[meal._id]) {
                    if (object.response[meal._id] === "") object.response[meal._id] = "0";
                    this.ordersCount[meal._id] = parseInt(object.response[meal._id]);
                } else this.ordersCount[meal._id] = 0;
            }).catch(e => { this.ordersCount[meal._id] = 0; });
        });
    }
    Reset() {
        Sql.deleteOptions("order-" + this.restaurant._id)
            .then(d => {
                for (let key in this.ordersCount) if (this.ordersCount.hasOwnProperty(key)) this.ordersCount[key] = 0;
                console.log(this.ordersCount);
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
                console.log(data);
                if (data == "NewOrder") this.navctrl.push(orderPage, { orders: orders });
                else this.navctrl.push(joinOrderPage, { orders: orders });
            }
        });
        alert.present();
    }
}