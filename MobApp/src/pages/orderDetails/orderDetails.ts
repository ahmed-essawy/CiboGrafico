import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Orders } from "../../providers/orders";

@Component({
    selector: 'page-orderDetails',
    templateUrl: 'orderDetails.html'
})
export class orderDetailsPage {
    orders: any;
    restName: any;
    constructor(public navCtrl: NavController, public params: NavParams, private orderp: Orders) {
        this.orderp.readUserOrderDetails(params.get("Id")).then(res => this.orders = res.response).catch(err => console.log(err));
        this.restName = params.get("restName")
        console.log(this.restName)
    }
}