import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { reservationPage } from "../reservation/reservation"
import {TraditionalMenuPage } from "../traditionalMenu/traditionalMenu"
@Component({
    selector: 'page-RestaurantProfile',
    templateUrl: 'RestaurantProfile.html'
})
export class RestaurantProfilePage {
    restaurant:any;
    constructor(public navCtrl: NavController, public params: NavParams, private rest: Restaurants) {
        this.rest.read(params.get("Id")).then((resp: PromiseResp) => this.restaurant = resp.response).catch(err => console.log(err));
    }
    reserve(restId) {
        this.navCtrl.push(reservationPage, { Id: restId});
    }
    menu(restId) {
        this.navCtrl.push(TraditionalMenuPage, { Id: restId });
    }
}
