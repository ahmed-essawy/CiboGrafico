import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Orders } from "../../../providers/orders";
import { orderDetailsPage } from "../../orderDetails/orderDetails";
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage {
    orders: any
    id: string = "5922d1aab1772d2744cc251a"
    constructor(private order: Orders, public navCtrl: NavController) {
        console.log("tmam")
        this.order.readUserOrders(this.id).then(res => {
            this.orders = res.response;
            console.log(this.orders)
        }).catch(err => console.log(err))
    }

    orderDetails(orderId: any, restName: any) {
        this.navCtrl.push(orderDetailsPage, { Id: orderId, restName: restName });
        console.log("tmam")
    }
}