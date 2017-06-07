import { Component } from '@angular/core';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { Sql} from "../../providers/sql";
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {RestaurantsListPage } from "../RestaurantsList/RestaurantsList"
@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html'
})
export class reservationPage {
    branches: any;
    userId: any;
    owner: any;
    date: any;
    guests: any;
    time: any;
    branch:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private restaurant: Restaurants,
        public toastCtrl: ToastController) {
        this.restaurant.readBranches(navParams.get("Id")).then((resp: PromiseResp) => this.branches = resp.response)
            .catch(err => console.log(err));
        Sql.selectOptions("_id").then(resp => console.log(this.userId = resp.response)).catch(err => console.log(err));
        Sql.selectOptions("firstName")
            .then(resp => Sql.selectOptions("lastName")
                .then(res => this.owner = resp.response + " " + res.response)
                .catch(error => console.log(error)))
            .catch(err => console.log(err));
        this.date = new Date().toISOString();
        this.time = new Date(new Date().getTime() + 3 * 3600000).toISOString();
        this.guests = 2;
    }
    reserve(data) {
        data.value.owner = this.userId;
        console.log(data.value);
        this.restaurant.addReservation({"restaurant": this.navParams.get("Id"),"reservation": data.value})
            .then((resp: PromiseResp) => console.log(resp)).catch(err => console.log(err));
        let toast = this.toastCtrl.create({
            message: 'You Reserved Successfully',
            showCloseButton: true,
            closeButtonText: "Ok"
    });
        toast.present();  
        toast.onDidDismiss(() => {
            this.navCtrl.push(RestaurantsListPage);
        });
    }

}
