import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from "@ionic-native/http";
import { reservationPage } from "../reservation/reservation"
@Component({
    selector: 'page-RestaurantProfile',
    templateUrl: 'RestaurantProfile.html'
})
export class RestaurantProfilePage {
    restaurant:any;
    constructor(private http: HTTP,public navCtrl: NavController, public params: NavParams) {
        let id = params.get("Id");
        this.http.get("http://169.254.80.80:8888/Restaurants/" + id, {}, {})
            .then(data => {
                this.restaurant = JSON.parse(data.data).data;
            })
            .catch(error => {
                console.log("error");
                console.log(error);
            });
    }
    reserve(restId) {
        this.navCtrl.push(reservationPage, { Id: restId});
    }

}
