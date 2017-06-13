import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Sql } from "../../../providers/sql";
import { Users } from "../../../providers/users";
import { orderPage } from "../../order/order";
import { joinOrderPage } from "../../joinOrder/joinOrder";
@Component({
    selector: 'page-favorites',
    templateUrl: 'favorites.html'
})
export class FavoritesPage {
    favorites: any;
    ordersCount: any = {};
    constructor(user: Users, private navParams: NavParams, private navctrl: NavController, private alertCtrl: AlertController) {
        Sql.selectOptions("_id").then(resp => {
            user.read(resp.response).then(res => this.favorites = res.response.favorites).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
    Order(orderId, restId) {
        let orders = {};
        orders[orderId] = 1;
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
                if (data == "NewOrder") this.navctrl.push(orderPage, { orders: orders, restId: restId });
                else this.navctrl.push(joinOrderPage, { orders: orders });
            }
        });
        alert.present();
    }
}