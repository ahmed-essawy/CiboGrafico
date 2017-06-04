import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Restaurants } from "../../providers/restaurants";
import { reservationPage } from "../reservation/reservation"
@Component({
    selector: 'page-RestaurantProfile',
    templateUrl: 'RestaurantProfile.html'
})
export class RestaurantProfilePage {
    restaurant:any;
    constructor(public navCtrl: NavController, public params: NavParams, private rest: Restaurants) {
        console.log(params.get("Id"));
        this.rest.read(params.get("Id")).then(res => this.restaurant=res).catch(err => console.log(err));
    }
    reserve(restId) {
        this.navCtrl.push(reservationPage, { Id: restId});
    }

}
