import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { RestaurantProfilePage } from "../RestaurantProfile/RestaurantProfile";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-RestaurantsList",
    templateUrl: "RestaurantsList.html"
})
export class RestaurantsListPage {
    restaurants: any;
    constructor(private navCtrl: NavController, private restaurant: Restaurants) {
        Utilities.showLoader();
        this.restaurant.readAll().then((resp: PromiseResp) => {
            this.restaurants = resp.response;
            Utilities.hideLoader();
        }).catch(err => { navCtrl.pop(); Utilities.hideLoader(); Utilities.showToast("Failed to retrieve data.") });
    }
    details(restId: any) { this.navCtrl.push(RestaurantProfilePage, { Id: restId }); }
}