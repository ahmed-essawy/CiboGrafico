import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Sql } from "../../../providers/sql";
import { Orders } from "../../../providers/orders";
import { orderDetailsPage } from "../../orderDetails/orderDetails";
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage {
    orders: any;
    constructor(order: Orders, private navCtrl: NavController) {
        Sql.selectOptions("_id").then(resp => {
            order.readUserOrders(resp.response).then(res => this.orders = res.response).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
    orderDetails(orderId: any, restName: any) {
        this.navCtrl.push(orderDetailsPage, { Id: orderId, restName: restName });
    }
}