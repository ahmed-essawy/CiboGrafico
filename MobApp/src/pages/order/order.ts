import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})
export class orderPage {
    Ordertype: Array<string>;
    constructor(private navParams: NavParams) {
        this.Ordertype = ["Delivery", "On the Way", "Inside"];
        console.log(navParams.get('orders'));
    }
}