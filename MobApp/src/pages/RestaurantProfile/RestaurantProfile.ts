import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { reservationPage } from "../reservation/reservation"
import { TraditionalMenuPage } from "../traditionalMenu/traditionalMenu"
import { Users } from "../../providers/users";
import { Sql } from "../../providers/sql";
@Component({
    selector: 'page-RestaurantProfile',
    templateUrl: 'RestaurantProfile.html'
})
export class RestaurantProfilePage {
    restaurant: any;
    isLogged: boolean;
    userId: any;
    comment:any;
    date:any=new Date().toISOString();
    constructor(public navCtrl: NavController, public params: NavParams, private rest: Restaurants) {
        this.rest.read(params.get("Id")).then((resp: PromiseResp) => console.log(this.restaurant = resp.response)).catch(err => console.log(err));
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        Sql.selectOptions("_id").then(resp => this.userId = resp.response).catch(err => console.log(err));
    }
    reserve(restId) {
        this.navCtrl.push(reservationPage, { Id: restId});
    }
    menu(restId) {
        this.navCtrl.push(TraditionalMenuPage, { Id: restId });
    }
    submit(data) {
        data.value._id = this.userId;
        console.log(data.value);
        this.rest.addReview({"restaurant": this.params.get("Id"),"review": data.value})
            .then((resp: PromiseResp) => console.log(resp)).catch(err => console.log(err));
        this.comment = "";
    }

}
