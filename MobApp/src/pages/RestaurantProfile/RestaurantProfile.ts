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
        let obj = { "_id": this.userId, "comment": data.value.comment };
        this.rest.addReview({ "restaurant": this.params.get("Id"), "review": obj})
            .then((resp: PromiseResp) => {
                if (resp.success) {
                    Sql.selectOptions("firstName")
                        .then(resp1 => Sql.selectOptions("lastName")
                            .then(resp2 => {
                                const name = resp1.response + " " + resp2.response;
                                this.restaurant.reviews.push({ "_id": obj._id, "comment": obj.comment,"name":name,"date":new Date().toISOString()});
                            })
                            .catch(error => console.log(error)))
                        .catch(err => console.log(err));
                    
                }
            }).catch(err => console.log(err));
        this.comment = "";
    }

}
