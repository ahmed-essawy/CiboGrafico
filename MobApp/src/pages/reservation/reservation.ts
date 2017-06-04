import { Component } from '@angular/core';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { NavController, NavParams } from 'ionic-angular';
@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html'
})
export class reservationPage {
    branches:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private restaurant: Restaurants) {
        console.log(navParams.get("Id"));
        this.restaurant.readBranches(navParams.get("Id")).then((resp: PromiseResp) => this.branches = resp.response).catch(err => console.log(err));

    }


}
