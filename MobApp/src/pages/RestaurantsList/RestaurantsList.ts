import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { RestaurantProfilePage } from "../RestaurantProfile/RestaurantProfile";
@Component({
    selector: 'page-RestaurantsList',
    templateUrl: 'RestaurantsList.html'
})
export class RestaurantsListPage {
    restaurants: any;
    constructor(public navCtrl: NavController, private restaurant: Restaurants) {
        this.restaurant.readAll().then((resp: PromiseResp) => this.restaurants = resp.response).catch(err => console.log(err));
    }
    details(restId) {
        this.navCtrl.push(RestaurantProfilePage, { Id: restId });
    }
}